import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./Account.css";

function Account() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [openForm, setOpenForm] = useState<"Creator" | "Business" | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [myProfiles, setMyProfiles] = useState<any[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [editDates, setEditDates] = useState<Record<string, string>>({});

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      navigate("/auth");
      return;
    }

    const userEmail = data.user.email || "";
    setEmail(userEmail);

    const { data: role } = await supabase.rpc("get_my_role");
    setIsAdmin(role === "admin");

    const { data: requestData } = await supabase
      .from("profile_requests")
      .select("*")
      .eq("account_email", userEmail)
      .order("created_at", { ascending: false });

    setRequests(requestData || []);

    const { data: profileData } = await supabase
      .from("public_profiles")
      .select("*")
      .eq("owner_email", userEmail)
      .order("created_at", { ascending: false });

    setMyProfiles(profileData || []);
  };

  const uploadFile = async (file: File | null) => {
    if (!file || file.size === 0) return "";

    const filePath = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file);

    if (error) {
      alert(error.message);
      return "";
    }

    const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const uploadManyFiles = async (files: FileList | null, max: number) => {
    if (!files || files.length === 0) return [];

    const limitedFiles = Array.from(files).slice(0, max);
    const urls: string[] = [];

    for (const file of limitedFiles) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }

    return urls;
  };

  const addDate = () => {
    if (!date || availability.includes(date)) return;
    setAvailability([...availability, date]);
    setDate("");
  };

  const removeDate = (item: string) => {
    setAvailability(availability.filter((day) => day !== item));
  };

  const submitRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const imageFile = form.get("image") as File | null;

    const { data: existingRequest } = await supabase
      .from("profile_requests")
      .select("id")
      .eq("account_email", email)
      .eq("profile_type", openForm)
      .eq("status", "pending")
      .maybeSingle();

    if (existingRequest) {
      alert(`You already have a pending ${openForm} request.`);
      return;
    }

    const imageUrl = await uploadFile(imageFile);

    const { error } = await supabase.from("profile_requests").insert({
      account_email: email,
      profile_type: openForm,
      name: form.get("name"),
      location: form.get("location"),
      niche: form.get("niche"),
      email: form.get("email"),
      bio: form.get("bio"),
      image_url: imageUrl,
      availability,
      socials: {
        instagram: form.get("instagram"),
        tiktok: form.get("tiktok"),
        youtube: form.get("youtube"),
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Request sent to Moonshot Media.");
    formEl.reset();
    setAvailability([]);
    setOpenForm(null);
    loadAccount();
  };

  const addEditDate = async (profile: any) => {
    const newDate = editDates[profile.id];
    if (!newDate) return;

    const currentDates = profile.availability || [];
    if (currentDates.includes(newDate)) return;

    const { error } = await supabase
      .from("public_profiles")
      .update({ availability: [...currentDates, newDate] })
      .eq("id", profile.id);

    if (error) {
      alert(error.message);
      return;
    }

    setEditDates({ ...editDates, [profile.id]: "" });
    loadAccount();
  };

  const removeEditDate = async (profile: any, dateToRemove: string) => {
    const updatedDates = (profile.availability || []).filter(
      (item: string) => item !== dateToRemove
    );

    const { error } = await supabase
      .from("public_profiles")
      .update({ availability: updatedDates })
      .eq("id", profile.id);

    if (error) {
      alert(error.message);
      return;
    }

    loadAccount();
  };

  const updateProfile = async (profile: any, formData: FormData, formEl: HTMLFormElement) => {
    const imageInput = formEl.elements.namedItem("profile_image") as HTMLInputElement;
    const businessImageInput = formEl.elements.namedItem("business_images") as HTMLInputElement;

    const newProfileImage = await uploadFile(imageInput?.files?.[0] || null);
    const newBusinessImages = await uploadManyFiles(
      businessImageInput?.files || null,
      4
    );

    const updatedBusinessImages =
      profile.profile_type === "Business" && newBusinessImages.length > 0
        ? newBusinessImages
        : profile.business_images || [];

    const { error } = await supabase
      .from("public_profiles")
      .update({
        name: formData.get("name"),
        location: formData.get("location"),
        niche: formData.get("niche"),
        bio: formData.get("bio"),
        image_url: newProfileImage || profile.image_url,
        business_images: updatedBusinessImages,
        socials: {
          instagram: formData.get("instagram"),
          tiktok: formData.get("tiktok"),
          youtube: formData.get("youtube"),
        },
      })
      .eq("id", profile.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated.");
    loadAccount();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <section className="page account-page">
      <div className="account-panel">
        <div className="account-top">
          <div>
            <p className="kicker">Main Account</p>
            <h1>Your Mission File</h1>
            <p>
              Logged in as: <strong>{email}</strong>
            </p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {isAdmin && (
          <div className="admin-access">
            <p className="kicker">Admin Access Detected</p>
            <h2>Mission Control Tools</h2>
            <p>You can access private admin tools.</p>
            <Link to="/admin" className="btn dark">
              Open Admin Dashboard
            </Link>
          </div>
        )}

        <div className="account-choice">
          <h2>Create A Profile Request</h2>
          <p>
            Submit a request. Creator requests may be approved directly. Business requests are reviewed so Mecca can contact the client and build the profile herself.
          </p>

          <div className="account-buttons">
            <button className="btn" onClick={() => setOpenForm("Creator")}>
              Influencer Account
            </button>

            <button className="btn alt" onClick={() => setOpenForm("Business")}>
              Business Account
            </button>
          </div>
        </div>

        {openForm && (
          <form className="account-form" onSubmit={submitRequest}>
            <h2>{openForm} Request</h2>

            <label>
              Name
              <input name="name" required />
            </label>

            <label>
              Location
              <input name="location" required />
            </label>

            <label>
              Niche
              <input name="niche" required />
            </label>

            <label>
              Email
              <input name="email" type="email" defaultValue={email} required />
            </label>

            <label className="full">
              Bio
              <textarea name="bio" required />
            </label>

            {openForm === "Creator" && (
              <>
                <label>
                  Add Availability Date
                  <div className="date-row">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <button type="button" onClick={addDate}>
                      Add
                    </button>
                  </div>
                </label>

                <div className="availability-list full">
                  {availability.map((item) => (
                    <button type="button" key={item} onClick={() => removeDate(item)}>
                      {item} ×
                    </button>
                  ))}
                </div>

                <label>
                  Profile Image
                  <input name="image" type="file" accept="image/*" />
                </label>

                <label>
                  Instagram
                  <input name="instagram" placeholder="@username" />
                </label>

                <label>
                  TikTok
                  <input name="tiktok" placeholder="@username" />
                </label>

                <label>
                  YouTube
                  <input name="youtube" placeholder="Channel link" />
                </label>
              </>
            )}

            <button className="btn" type="submit">
              Send Request
            </button>
          </form>
        )}

        <div className="request-history">
          <h2>Your Requests</h2>

          {requests.length === 0 ? (
            <p>No requests submitted yet.</p>
          ) : (
            <div className="request-list">
              {requests.map((request) => (
                <div className="request-card" key={request.id}>
                  <h3>{request.name}</h3>
                  <p>
                    {request.profile_type} · {request.niche}
                  </p>
                  <p>{request.bio}</p>
                  <span>{request.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="owned-profiles">
          <h2>Your Approved Profiles</h2>

          {myProfiles.length === 0 ? (
            <p>No approved profiles yet.</p>
          ) : (
            <div className="owned-profile-list">
              {myProfiles.map((profile) => (
                <form
                  className="owned-profile-card"
                  key={profile.id}
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProfile(profile, new FormData(e.currentTarget), e.currentTarget);
                  }}
                >
                  <h3>{profile.name}</h3>
                  <p>
                    {profile.profile_type} · {profile.owner_email}
                  </p>

                  {profile.image_url && (
                    <img className="account-preview-image" src={profile.image_url} alt={profile.name} />
                  )}

                  <label>
                    Name
                    <input name="name" defaultValue={profile.name || ""} />
                  </label>

                  <label>
                    Location
                    <input name="location" defaultValue={profile.location || ""} />
                  </label>

                  <label>
                    Niche
                    <input name="niche" defaultValue={profile.niche || ""} />
                  </label>

                  <label>
                    Bio
                    <textarea name="bio" defaultValue={profile.bio || ""} />
                  </label>

                  <label>
                    Main Profile Image
                    <input name="profile_image" type="file" accept="image/*" />
                  </label>

                  {profile.profile_type === "Business" && (
                    <>
                      <label>
                        Business Images
                        <input name="business_images" type="file" accept="image/*" multiple />
                      </label>

                      {profile.business_images?.length > 0 && (
                        <div className="account-image-grid">
                          {profile.business_images.map((image: string) => (
                            <img key={image} src={image} alt={profile.name} />
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  <div className="profile-availability-editor">
                    <h4>Availability</h4>

                    <div className="date-row">
                      <input
                        type="date"
                        value={editDates[profile.id] || ""}
                        onChange={(e) =>
                          setEditDates({ ...editDates, [profile.id]: e.target.value })
                        }
                      />
                      <button type="button" onClick={() => addEditDate(profile)}>
                        Add
                      </button>
                    </div>

                    <div className="availability-list">
                      {(profile.availability || []).map((item: string) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => removeEditDate(profile, item)}
                        >
                          {item} ×
                        </button>
                      ))}
                    </div>
                  </div>

                  <label>
                    Instagram
                    <input name="instagram" defaultValue={profile.socials?.instagram || ""} />
                  </label>

                  <label>
                    TikTok
                    <input name="tiktok" defaultValue={profile.socials?.tiktok || ""} />
                  </label>

                  <label>
                    YouTube
                    <input name="youtube" defaultValue={profile.socials?.youtube || ""} />
                  </label>

                  <button className="btn" type="submit">
                    Save Changes
                  </button>
                </form>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Account;
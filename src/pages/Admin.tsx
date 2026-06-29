import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import "./Admin.css";

type AdminTab = "dashboard" | "requests" | "create" | "profiles";
type RequestFilter = "All" | "Creator" | "Business";

function Admin() {
  const [allowed, setAllowed] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [requestFilter, setRequestFilter] = useState<RequestFilter>("All");
  const [profileSearch, setProfileSearch] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (allowed) {
      loadRequests();
      loadProfiles();
    }
  }, [allowed]);

  const checkAdmin = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data: role } = await supabase.rpc("get_my_role");
    setAllowed(role === "admin");
  };

  const loadRequests = async () => {
    const { data, error } = await supabase
      .from("profile_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setRequests(data || []);
  };

  const loadProfiles = async () => {
    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error(error);
      return;
    }

    setProfiles(data || []);
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

    const urls: string[] = [];

    for (const file of Array.from(files).slice(0, max)) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }

    return urls;
  };

  const closeRequest = async (id: string) => {
    if (!confirm("Close and remove this request?")) return;

    const { error } = await supabase.from("profile_requests").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadRequests();
  };

  const approveCreator = async (request: any) => {
    const { error } = await supabase.from("public_profiles").insert({
      owner_email: request.account_email,
      profile_type: "Creator",
      name: request.name,
      location: request.location,
      niche: request.niche,
      bio: request.bio,
      image_url: request.image_url,
      availability: request.availability,
      socials: request.socials,
      is_active: true,
    });

    if (error) {
      alert(error.message);
      return;
    }

    await supabase.from("profile_requests").update({ status: "approved" }).eq("id", request.id);

    loadRequests();
    loadProfiles();
  };

  const createBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const fileInput = formEl.elements.namedItem("business_images") as HTMLInputElement;
    const uploadedImages = await uploadManyFiles(fileInput.files, 4);

    const { error } = await supabase.from("public_profiles").insert({
      owner_email: form.get("owner_email"),
      profile_type: "Business",
      name: form.get("name"),
      years_in_business: form.get("years_in_business"),
      business_type: form.get("business_type"),
      owners_count: form.get("owners_count"),
      location: form.get("location"),
      bio: form.get("bio"),
      niche: form.get("niche"),
      expected_posts: form.get("expected_posts"),
      content_deadlines: form.get("content_deadlines"),
      business_images: uploadedImages,
      image_url: uploadedImages[0] || "",
      is_active: true,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Business profile created.");
    formEl.reset();
    loadProfiles();
    setTab("profiles");
  };

  const deleteProfile = async (id: string) => {
    if (!confirm("Delete this profile?")) return;

    const { error } = await supabase.from("public_profiles").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadProfiles();
  };

  const filteredRequests =
    requestFilter === "All"
      ? requests
      : requests.filter((request) => request.profile_type === requestFilter);

  const filteredProfiles = useMemo(() => {
    const term = profileSearch.toLowerCase();

    return profiles.filter((profile) => {
      const text = `
        ${profile.name || ""}
        ${profile.profile_type || ""}
        ${profile.owner_email || ""}
        ${profile.location || ""}
        ${profile.niche || ""}
        ${profile.business_type || ""}
      `.toLowerCase();

      return text.includes(term);
    });
  }, [profiles, profileSearch]);

  const pendingRequests = requests.filter((request) => request.status === "pending");

  if (!allowed) {
    return (
      <section className="page admin-page">
        <div className="admin-card">
          <h1>Admin Only</h1>
          <p>You do not have access to this page.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page admin-page">
      <div className="admin-card admin-hero">
        <p className="kicker">Admin Dashboard</p>
        <h1>Mission Control</h1>

        <div className="admin-tabs">
          <button onClick={() => setTab("dashboard")}>Dashboard</button>
          <button onClick={() => setTab("requests")}>Requests</button>
          <button onClick={() => setTab("create")}>Create Business</button>
          <button onClick={() => setTab("profiles")}>Live Profiles</button>
        </div>
      </div>

      {tab === "dashboard" && (
        <>
          <div className="admin-stats">
            <div>
              <h3>{profiles.length}</h3>
              <p>Live Profiles</p>
            </div>
            <div>
              <h3>{pendingRequests.length}</h3>
              <p>Pending Requests</p>
            </div>
            <div>
              <h3>{profiles.filter((p) => p.profile_type === "Business").length}</h3>
              <p>Businesses</p>
            </div>
            <div>
              <h3>{profiles.filter((p) => p.profile_type === "Creator").length}</h3>
              <p>Influencers</p>
            </div>
          </div>

          <div className="admin-card admin-section">
            <h2>Quick Profile Search</h2>
            <p>Search by name, email, location, niche, or profile type.</p>

            <input
              className="admin-search"
              value={profileSearch}
              onChange={(e) => setProfileSearch(e.target.value)}
              placeholder="Search profiles..."
            />

            <div className="admin-mini-list">
              {filteredProfiles.slice(0, 8).map((profile) => (
                <div className="admin-mini-row" key={profile.id}>
                  <strong>{profile.name}</strong>
                  <span>
                    {profile.profile_type} · {profile.owner_email || "No owner"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "requests" && (
        <>
          <div className="admin-filter-card">
            <h2>Profile Requests</h2>
            <p>
              Creator requests can be approved directly. Business requests should
              be closed after Mecca contacts the client.
            </p>

            <div className="request-filters">
              {["All", "Creator", "Business"].map((item) => (
                <button
                  key={item}
                  className={requestFilter === item ? "active" : ""}
                  onClick={() => setRequestFilter(item as RequestFilter)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-list">
            {filteredRequests.map((request) => (
              <div className="admin-row" key={request.id}>
                <div>
                  <h3>{request.name}</h3>
                  <p>
                    {request.profile_type} · {request.location} · {request.status}
                  </p>
                  <p>{request.bio}</p>

                  <div className="request-email-box">
                    <span>Client Email</span>
                    <a href={`mailto:${request.email || request.account_email}`}>
                      {request.email || request.account_email}
                    </a>
                  </div>
                </div>

                <div className="admin-actions">
                  {request.profile_type === "Creator" && request.status === "pending" && (
                    <button onClick={() => approveCreator(request)}>Approve + Publish</button>
                  )}

                  <button onClick={() => closeRequest(request.id)}>
                    {request.profile_type === "Business" ? "Close Request" : "Reject / Close"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "create" && (
        <div className="admin-card admin-section">
          <h2>Create Business Profile</h2>
          <p>
            Use this after Mecca sits down with the business owner and collects
            the full details.
          </p>

          <form className="admin-form" onSubmit={createBusiness}>
            <input name="owner_email" placeholder="Client Email" required />
            <input name="name" placeholder="Business Name" required />
            <input name="years_in_business" placeholder="Years In Business" />
            <input name="business_type" placeholder="Type Of Business" />
            <input name="owners_count" placeholder="How Many Owners" />
            <input name="location" placeholder="Location" />
            <input name="niche" placeholder="Niche" />
            <input name="expected_posts" placeholder="# Of Posts Expected" />
            <input name="content_deadlines" placeholder="Content Deadlines" />

            <label className="admin-file-label">
              Business Images
              <span>Optional. Upload up to four images.</span>
              <input name="business_images" type="file" accept="image/*" multiple />
            </label>

            <textarea name="bio" placeholder="Business Bio" />

            <button className="btn" type="submit">
              Create Business
            </button>
          </form>
        </div>
      )}

      {tab === "profiles" && (
        <>
          <div className="admin-card admin-section">
            <h2>Live Profiles</h2>
            <input
              className="admin-search"
              value={profileSearch}
              onChange={(e) => setProfileSearch(e.target.value)}
              placeholder="Search profiles..."
            />
          </div>

          <div className="admin-list">
            {filteredProfiles.map((profile) => (
              <div className="admin-row" key={profile.id}>
                <div>
                  <h3>{profile.name}</h3>
                  <p>
                    {profile.profile_type} · {profile.owner_email || "No owner"} ·{" "}
                    {profile.location || "No location"}
                  </p>
                  <p>{profile.bio}</p>

                  {profile.business_images?.length > 0 && (
                    <div className="admin-image-strip">
                      {profile.business_images.map((image: string) => (
                        <img key={image} src={image} alt={profile.name} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="admin-actions">
                  <button onClick={() => deleteProfile(profile.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Admin;
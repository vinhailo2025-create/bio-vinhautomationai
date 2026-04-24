/* ============================================================
   Vinh Automation AI — Shared data layer
   - Default content
   - Supabase sync with localStorage fallback
   - localStorage helpers (load / save / reset / export / import)
   ============================================================ */
(function (global) {
  const STORAGE_KEY = "vinh_bio_data_v1";
  const SUPABASE_URL = "https://asffrqugifhmiwvyddrn.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzZmZycXVnaWZobWl3dnlkZHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjQ0NjYsImV4cCI6MjA5MjEwMDQ2Nn0.T-jWxcRLiOYZXMla4QCoShhO32i-yToFrtL5zj665kY";

  const DEFAULT_DATA = {
    profile: {
      avatarText: "VA",
      avatarImage: "", // optional URL — overrides avatarText
      name: "Vinh Automation AI",
      badge: "AI SYSTEM ACTIVE",
      description:
        "Tối ưu hóa quy trình cá nhân & doanh nghiệp với AI Automation | Affiliate AI | Reup | AI | Automation",
    },
    qr: {
      title: "☕ Mời cà phê Vinh",
      subtitle: "Quét mã QR để ủng hộ hệ thống AI",
      image:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=VinhAutomationAI-Donate-0905626639",
      note: "Cảm ơn bạn đã ủng hộ 💜",
    },
    footer: "© 2026 Vinh Automation AI — Powered by AI & Automation",
    gift: {
      title: "Nhận quà từ Vinh",
      subtitle: "Nhận tài nguyên & ưu đãi miễn phí (có giới hạn)",
      link: "#"
    },
    sections: [
      {
        id: "support",
        title: "Hỗ trợ & Liên hệ",
        theme: "support", // support | social | community
        items: [
          {
            title: "Mời cà phê Vinh",
            subtitle: "Ủng hộ duy trì hệ thống AI",
            icon: "☕",
            iconColor: "yellow",
            link: "",
            action: "qr", // "qr" opens QR modal, otherwise link
          },
          {
            title: "Tool – Automation",
            subtitle: "Bộ công cụ Automation chính thức",
            icon: "🛠️",
            iconColor: "purple",
            link: "#",
          },
          {
            title: "Hành Trình Reup",
            subtitle: "Lộ trình kiếm tiền với Reup",
            icon: "♻",
            iconColor: "green",
            link: "#",
          },
          {
            title: "Khóa học AI",
            subtitle: "Masterclass AI & Automation",
            icon: "🎓",
            iconColor: "yellow",
            link: "#",
          },
          {
            title: "Zalo cá nhân",
            subtitle: "Coach 1:1 – 0905626639",
            icon: "📞",
            iconColor: "cyan",
            link: "https://zalo.me/0905626639",
          },
        ],
      },
      {
        id: "social",
        title: "Social & Masterclass",
        theme: "social",
        items: [
          {
            title: "YouTube Masterclass",
            subtitle: "Hướng dẫn Affiliate, AI, Automation",
            icon: "▶",
            iconColor: "red",
            link: "#",
          },
          {
            title: "TikTok Channel",
            subtitle: "Chia sẻ kiến thức",
            icon: "🎵",
            iconColor: "purple",
            link: "#",
          },
          {
            title: "Facebook Profile",
            subtitle: "Giao lưu & tư vấn trực tiếp",
            icon: "f",
            iconColor: "blue",
            link: "#",
          },
          {
            title: "Fanpage chính thức",
            subtitle: "Cập nhật công cụ & AI",
            icon: "★",
            iconColor: "yellow",
            link: "#",
          },
        ],
      },
      {
        id: "community",
        title: "Cộng đồng",
        theme: "community",
        items: [
          { title: "Zalo Group AI #1", subtitle: "Thảo luận Automation hằng ngày", icon: "💬", iconColor: "cyan", link: "#" },
          { title: "Zalo Group AI #2", subtitle: "Nhóm chia sẻ công cụ AI", icon: "💬", iconColor: "cyan", link: "#" },
          { title: "Reup Automation", subtitle: "Hệ thống Reup tự động", icon: "♻", iconColor: "yellow", link: "#" },
          { title: "Vũ Trụ AI – Doanh nghiệp", subtitle: "AI cho doanh nghiệp & chủ shop", icon: "🌌", iconColor: "pink", link: "#" },
          { title: "Facebook Group", subtitle: "Cộng đồng Facebook chính thức", icon: "f", iconColor: "blue", link: "#" },
          { title: "Affiliate Automation AI", subtitle: "Kiếm tiền với AI & Affiliate", icon: "💰", iconColor: "yellow", link: "#" },
          { title: "Group Vũ Trụ AI", subtitle: "Hệ sinh thái AI toàn diện", icon: "🚀", iconColor: "green", link: "#" },
        ],
      },
    ],
  };

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return deepClone(DEFAULT_DATA);
      const parsed = JSON.parse(raw);
      // shallow merge with defaults so missing keys don't crash
      return Object.assign(deepClone(DEFAULT_DATA), parsed);
    } catch (e) {
      console.warn("Failed to load data, using defaults", e);
      return deepClone(DEFAULT_DATA);
    }
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    return deepClone(DEFAULT_DATA);
  }

  function exportData(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vinh-bio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // ============================================================
  // SUPABASE SYNC LAYER
  // ============================================================
  function getAuthToken() {
    try {
      const raw = localStorage.getItem("vinh_bio_sb_session");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.access_token ? parsed.access_token : null;
    } catch (e) { return null; }
  }

  async function sbFetch(path, options) {
    options = options || {};
    const token = getAuthToken();
    const headers = Object.assign({
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": "Bearer " + (token || SUPABASE_ANON_KEY),
      "Content-Type": "application/json",
    }, options.headers || {});
    const res = await fetch(SUPABASE_URL + path, Object.assign({}, options, { headers }));
    if (!res.ok) {
      const text = await res.text();
      throw new Error("Supabase " + res.status + ": " + text);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  // Load data from Supabase; fallback to localStorage/default on error
  async function loadDataRemote() {
    try {
      const rows = await sbFetch("/rest/v1/bio_data?id=eq.1&select=data", { method: "GET" });
      if (rows && rows.length && rows[0].data && Object.keys(rows[0].data).length > 0) {
        const remote = rows[0].data;
        const merged = Object.assign(deepClone(DEFAULT_DATA), remote);
        // cache locally
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch (e) {}
        return merged;
      }
    } catch (e) {
      console.warn("Supabase load failed, using local cache", e);
    }
    return loadData();
  }

  // Save data to Supabase (requires authenticated session); also cache locally
  async function saveDataRemote(data) {
    // always cache locally first
    saveData(data);
    const body = JSON.stringify({ id: 1, data: data, updated_at: new Date().toISOString() });
    await sbFetch("/rest/v1/bio_data?on_conflict=id", {
      method: "POST",
      headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
      body: body,
    });
    return true;
  }

  // Login via Supabase Auth
  async function signIn(email, password) {
    const res = await fetch(SUPABASE_URL + "/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (!res.ok) {
      const t = await res.text();
      throw new Error(t);
    }
    const session = await res.json();
    localStorage.setItem("vinh_bio_sb_session", JSON.stringify(session));
    return session;
  }

  function signOut() {
    localStorage.removeItem("vinh_bio_sb_session");
  }

  function isSignedIn() {
    const tok = getAuthToken();
    if (!tok) return false;
    try {
      const payload = JSON.parse(atob(tok.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (e) { return false; }
  }

  global.VinhBioData = {
    DEFAULT_DATA,
    STORAGE_KEY,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    loadData,
    saveData,
    resetData,
    exportData,
    importData,
    deepClone,
    // remote
    loadDataRemote,
    saveDataRemote,
    signIn,
    signOut,
    isSignedIn,
  };
})(window);

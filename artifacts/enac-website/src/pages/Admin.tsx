import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import {
  collection, getDocs, doc, updateDoc, getDoc, setDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Users, Shield, RefreshCw, Download, User, Mail, GraduationCap,
  Building2, Calendar, Edit2, Save, X, ChevronDown, ChevronUp,
  Cpu, Bot, Globe, Code2
} from "lucide-react";

const ADMIN_EMAIL = "2025btece008@curaj.ac.in";

const CLUB_IDS = ["aiml", "robotics", "webdev", "cyber", "competitive"];
const CLUB_NAMES: Record<string, string> = {
  aiml: "AI / ML Club",
  robotics: "Robotics & IoT Club",
  webdev: "Web & App Dev Club",
  cyber: "Cybersecurity Club",
  competitive: "Competitive Programming Club",
};
const CLUB_ICONS: Record<string, React.ElementType> = {
  aiml: Cpu,
  robotics: Bot,
  webdev: Globe,
  cyber: Shield,
  competitive: Code2,
};

interface Member {
  uid: string;
  name: string;
  email: string;
  department: string;
  branch: string;
  clubsJoined: string[];
  createdAt?: { seconds: number };
}

interface ClubLeadership {
  president: { name: string; branch: string; email: string };
  vicePresident: { name: string; branch: string; email: string };
  advisor: { name: string; designation: string; email: string };
}

interface CoreMember {
  name: string;
  role: string;
  photo: string;
}

const defaultLeadership: ClubLeadership = {
  president: { name: "", branch: "", email: "" },
  vicePresident: { name: "", branch: "", email: "" },
  advisor: { name: "", designation: "", email: "" },
};

export default function Admin() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [activeTab, setActiveTab] = useState<"members" | "clubs" | "team">("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState<string>("all");
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const [clubLeadership, setClubLeadership] = useState<Record<string, ClubLeadership>>({});
  const [editingClub, setEditingClub] = useState<string | null>(null);
  const [editLeadership, setEditLeadership] = useState<ClubLeadership>(defaultLeadership);
  const [savingClub, setSavingClub] = useState(false);

  const [coreTeam, setCoreTeam] = useState<CoreMember[]>([]);
  const [editingTeamIndex, setEditingTeamIndex] = useState<number | null>(null);
  const [editTeamMember, setEditTeamMember] = useState<CoreMember>({ name: "", role: "", photo: "" });
  const [savingTeam, setSavingTeam] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    fetchMembers();
    fetchClubLeadership();
    fetchCoreTeam();
  }, [user]);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    const snap = await getDocs(collection(db, "users"));
    const data: Member[] = [];
    snap.forEach((d) => data.push({ uid: d.id, ...d.data() } as Member));
    setMembers(data);
    setLoadingMembers(false);
  };

  const fetchClubLeadership = async () => {
    const result: Record<string, ClubLeadership> = {};
    for (const id of CLUB_IDS) {
      const snap = await getDoc(doc(db, "clubs", id));
      if (snap.exists()) {
        result[id] = snap.data() as ClubLeadership;
      } else {
        result[id] = {
          president: { name: "To Be Updated", branch: "B.Tech Computer Science", email: `${id}.enac@curaj.ac.in` },
          vicePresident: { name: "To Be Updated", branch: "B.Tech Computer Science", email: `${id}.enac@curaj.ac.in` },
          advisor: { name: "To Be Updated", designation: "Faculty Advisor", email: `${id}.enac@curaj.ac.in` },
        };
      }
    }
    setClubLeadership(result);
  };

  const fetchCoreTeam = async () => {
    const snap = await getDoc(doc(db, "settings", "coreTeam"));
    if (snap.exists()) {
      setCoreTeam(snap.data().members ?? []);
    } else {
      setCoreTeam([
        { name: "Core Member 1", role: "President", photo: "" },
        { name: "Core Member 2", role: "Vice President", photo: "" },
        { name: "Core Member 3", role: "Secretary", photo: "" },
      ]);
    }
  };

  const handleEditClub = (clubId: string) => {
    setEditingClub(clubId);
    setEditLeadership(clubLeadership[clubId] ?? defaultLeadership);
  };

  const handleSaveClub = async () => {
    if (!editingClub) return;
    setSavingClub(true);
    await setDoc(doc(db, "clubs", editingClub), editLeadership);
    setClubLeadership((prev) => ({ ...prev, [editingClub]: editLeadership }));
    setEditingClub(null);
    setSavingClub(false);
  };

  const handleSaveTeamMember = async () => {
    if (editingTeamIndex === null) return;
    setSavingTeam(true);
    const updated = [...coreTeam];
    if (editingTeamIndex === -1) {
      updated.push(editTeamMember);
    } else {
      updated[editingTeamIndex] = editTeamMember;
    }
    await setDoc(doc(db, "settings", "coreTeam"), { members: updated });
    setCoreTeam(updated);
    setEditingTeamIndex(null);
    setSavingTeam(false);
  };

  const handleRemoveTeamMember = async (index: number) => {
    const updated = coreTeam.filter((_, i) => i !== index);
    await setDoc(doc(db, "settings", "coreTeam"), { members: updated });
    setCoreTeam(updated);
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Department", "Branch", "Clubs Joined", "Registration Date"];
    const rows = filteredMembers.map((m) => [
      m.name ?? "",
      m.email ?? "",
      m.department ?? "",
      m.branch ?? "",
      (m.clubsJoined ?? []).map((id) => CLUB_NAMES[id] ?? id).join("; "),
      m.createdAt ? new Date(m.createdAt.seconds * 1000).toLocaleDateString() : "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "enac-members.csv";
    a.click();
  };

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || (m.name ?? "").toLowerCase().includes(q) || (m.email ?? "").toLowerCase().includes(q) || (m.branch ?? "").toLowerCase().includes(q);
    const matchesClub = selectedClub === "all" || (m.clubsJoined ?? []).includes(selectedClub);
    return matchesSearch && matchesClub;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground text-sm">ENAC Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground bg-primary/5 border border-primary/20 rounded-xl px-4 py-2 w-fit">
            <Mail className="w-4 h-4 text-primary" />
            Logged in as: <span className="font-semibold text-primary">{user.email}</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: "members", label: "Registered Members", icon: Users },
            { id: "clubs", label: "Club Leadership", icon: Shield },
            { id: "team", label: "Core Team", icon: User },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-card border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Tab */}
        {activeTab === "members" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filters & Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Search by name, email, or branch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="all">All Clubs</option>
                {CLUB_IDS.map((id) => (
                  <option key={id} value={id}>{CLUB_NAMES[id]}</option>
                ))}
              </select>
              <button
                onClick={fetchMembers}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium hover:bg-secondary transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-card border border-border/60 rounded-xl p-4 text-center">
                <p className="text-2xl font-display font-bold text-foreground">{members.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Members</p>
              </div>
              {CLUB_IDS.slice(0, 3).map((id) => (
                <div key={id} className="bg-card border border-border/60 rounded-xl p-4 text-center">
                  <p className="text-2xl font-display font-bold text-foreground">
                    {members.filter((m) => (m.clubsJoined ?? []).includes(id)).length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{CLUB_NAMES[id]}</p>
                </div>
              ))}
            </div>

            {loadingMembers ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">No members found.</div>
            ) : (
              <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">#</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Branch</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Clubs Joined</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Registered</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {filteredMembers.map((member, i) => (
                        <>
                          <tr
                            key={member.uid}
                            className="hover:bg-muted/30 transition-colors"
                          >
                            <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                            <td className="px-4 py-3 font-medium text-foreground">{member.name ?? "—"}</td>
                            <td className="px-4 py-3 text-muted-foreground">{member.email ?? "—"}</td>
                            <td className="px-4 py-3 text-muted-foreground text-xs max-w-[160px] truncate">{member.branch ?? "—"}</td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {(member.clubsJoined ?? []).length === 0 ? (
                                  <span className="text-xs text-muted-foreground">None</span>
                                ) : (
                                  (member.clubsJoined ?? []).map((cid) => {
                                    const Icon = CLUB_ICONS[cid] ?? Shield;
                                    return (
                                      <span key={cid} className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                        <Icon className="w-3 h-3" />
                                        {CLUB_NAMES[cid] ?? cid}
                                      </span>
                                    );
                                  })
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground text-xs">
                              {member.createdAt
                                ? new Date(member.createdAt.seconds * 1000).toLocaleDateString()
                                : "—"}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setExpandedMember(expandedMember === member.uid ? null : member.uid)}
                                className="p-1 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
                              >
                                {expandedMember === member.uid ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </td>
                          </tr>
                          {expandedMember === member.uid && (
                            <tr key={`${member.uid}-expanded`} className="bg-muted/20">
                              <td colSpan={7} className="px-6 py-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Full Name</p>
                                    <p className="flex items-center gap-1.5 text-foreground"><User className="w-3.5 h-3.5 text-primary" />{member.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                                    <p className="flex items-center gap-1.5 text-foreground"><Mail className="w-3.5 h-3.5 text-primary" />{member.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Department</p>
                                    <p className="flex items-center gap-1.5 text-foreground"><Building2 className="w-3.5 h-3.5 text-primary" />{member.department}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Branch</p>
                                    <p className="flex items-center gap-1.5 text-foreground"><GraduationCap className="w-3.5 h-3.5 text-primary" />{member.branch}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Registered On</p>
                                    <p className="flex items-center gap-1.5 text-foreground">
                                      <Calendar className="w-3.5 h-3.5 text-primary" />
                                      {member.createdAt ? new Date(member.createdAt.seconds * 1000).toLocaleString() : "—"}
                                    </p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Clubs Joined</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {(member.clubsJoined ?? []).length === 0 ? (
                                        <span className="text-muted-foreground">No clubs joined yet</span>
                                      ) : (
                                        (member.clubsJoined ?? []).map((cid) => (
                                          <span key={cid} className="text-xs bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
                                            {CLUB_NAMES[cid] ?? cid}
                                          </span>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Club Leadership Tab */}
        {activeTab === "clubs" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-muted-foreground text-sm">Update the president, vice president, and faculty advisor for each technical club.</p>
            {CLUB_IDS.map((clubId) => {
              const leadership = clubLeadership[clubId];
              const ClubIcon = CLUB_ICONS[clubId] ?? Shield;
              const isEditing = editingClub === clubId;
              return (
                <div key={clubId} className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ClubIcon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground">{CLUB_NAMES[clubId]}</h3>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => handleEditClub(clubId)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveClub}
                          disabled={savingClub}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          {savingClub ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingClub(null)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {!leadership ? (
                    <p className="text-muted-foreground text-sm">Loading...</p>
                  ) : isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(["president", "vicePresident", "advisor"] as const).map((role) => (
                        <div key={role} className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                            {role === "president" ? "President" : role === "vicePresident" ? "Vice President" : "Faculty Advisor"}
                          </h4>
                          <input
                            type="text"
                            placeholder="Name"
                            value={editLeadership[role]?.name ?? ""}
                            onChange={(e) => setEditLeadership((prev) => ({
                              ...prev,
                              [role]: { ...prev[role], name: e.target.value }
                            }))}
                            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                          {role !== "advisor" ? (
                            <input
                              type="text"
                              placeholder="Branch/Programme"
                              value={(editLeadership[role] as { name: string; branch: string; email: string })?.branch ?? ""}
                              onChange={(e) => setEditLeadership((prev) => ({
                                ...prev,
                                [role]: { ...prev[role], branch: e.target.value }
                              }))}
                              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Designation"
                              value={(editLeadership.advisor)?.designation ?? ""}
                              onChange={(e) => setEditLeadership((prev) => ({
                                ...prev,
                                advisor: { ...prev.advisor, designation: e.target.value }
                              }))}
                              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                          )}
                          <input
                            type="email"
                            placeholder="Email"
                            value={editLeadership[role]?.email ?? ""}
                            onChange={(e) => setEditLeadership((prev) => ({
                              ...prev,
                              [role]: { ...prev[role], email: e.target.value }
                            }))}
                            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: "President", data: leadership.president, isAdvisor: false },
                        { label: "Vice President", data: leadership.vicePresident, isAdvisor: false },
                        { label: "Faculty Advisor", data: leadership.advisor, isAdvisor: true },
                      ].map(({ label, data, isAdvisor }) => (
                        <div key={label} className="bg-muted/40 rounded-xl p-4 border border-border/40">
                          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{label}</p>
                          <p className="font-medium text-foreground text-sm">{data?.name || "—"}</p>
                          <p className="text-muted-foreground text-xs">
                            {isAdvisor ? (data as { designation: string })?.designation : (data as { branch: string })?.branch}
                          </p>
                          <p className="text-primary text-xs mt-1">{data?.email}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Core Team Tab */}
        {activeTab === "team" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground text-sm">Manage the ENAC core team members — names, roles, and profile photos.</p>
              <button
                onClick={() => { setEditingTeamIndex(-1); setEditTeamMember({ name: "", role: "", photo: "" }); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-colors shadow-sm"
              >
                + Add Member
              </button>
            </div>

            {editingTeamIndex !== null && (
              <div className="bg-card border border-primary/30 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-foreground mb-4">
                  {editingTeamIndex === -1 ? "Add New Core Team Member" : "Edit Core Team Member"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="Member name"
                      value={editTeamMember.name}
                      onChange={(e) => setEditTeamMember((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Role / Position</label>
                    <input
                      type="text"
                      placeholder="e.g. President, Secretary"
                      value={editTeamMember.role}
                      onChange={(e) => setEditTeamMember((prev) => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Photo URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editTeamMember.photo}
                      onChange={(e) => setEditTeamMember((prev) => ({ ...prev, photo: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveTeamMember}
                    disabled={savingTeam}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {savingTeam ? "Saving..." : "Save Member"}
                  </button>
                  <button
                    onClick={() => setEditingTeamIndex(null)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coreTeam.map((member, i) => (
                <div key={i} className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-14 h-14 rounded-full object-cover border-2 border-border" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-border">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{member.name}</p>
                    <p className="text-xs text-primary font-medium mt-0.5">{member.role}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => { setEditingTeamIndex(i); setEditTeamMember(member); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleRemoveTeamMember(i)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <X className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

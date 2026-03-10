import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Download,
  Edit,
  Eye,
  EyeOff,
  Lock,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { type Scheme, categoryLabels, indianStates } from "../data/schemes";
import { useActor } from "../hooks/useActor";
import {
  addSchemeToCanister,
  deleteSchemeFromCanister,
  updateSchemeInCanister,
} from "../services/backendService";
import { useSchemesStore } from "../store/schemesStore";

const ADMIN_PASSWORD = "admin123";

type SchemeFormData = Omit<Scheme, "id" | "slug"> & {
  id?: string;
  slug?: string;
};

const emptyForm: SchemeFormData = {
  name: "",
  state: "all",
  category: "general",
  benefit: "",
  benefit_amount_numeric: 0,
  eligibility: "",
  documents: [],
  apply_link: "",
  description: "",
  tags: [],
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      onLogin();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <main
      style={{ background: "#0B0F1A" }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-10 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center mx-auto mb-6">
          <Lock size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/50 text-sm mb-8">Enter password to continue</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Input
              type={showPw ? "text" : "password"}
              placeholder="Admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="bg-white/5 border-white/10 text-white pr-10"
              data-ocid="admin.input"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm" data-ocid="admin.error_state">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="btn-gradient w-full py-3 font-bold rounded-xl"
            data-ocid="admin.submit_button"
          >
            Login
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

// ─── Scheme Form Dialog ───────────────────────────────────────────────────────
function SchemeFormDialog({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: SchemeFormData) => void;
  initial?: Scheme;
}) {
  const [form, setForm] = useState<SchemeFormData>(
    initial ? { ...initial } : { ...emptyForm },
  );
  const [docsText, setDocsText] = useState(
    initial ? initial.documents.join("\n") : "",
  );
  const [tagsText, setTagsText] = useState(
    initial ? initial.tags.join(", ") : "",
  );

  const handleSave = () => {
    const docs = docsText
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({ ...form, documents: docs, tags });
  };

  const setField = (field: keyof SchemeFormData, value: string | number) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="bg-[#13182a] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="admin.dialog"
      >
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit Scheme" : "Add New Scheme"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div className="md:col-span-2">
            <p className="text-white/60 text-xs mb-1.5 block">Scheme Name *</p>
            <Input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              data-ocid="admin.input"
            />
          </div>

          <div>
            <p className="text-white/60 text-xs mb-1.5 block">State</p>
            <Select
              value={form.state}
              onValueChange={(v) => setField("state", v)}
            >
              <SelectTrigger
                className="bg-white/5 border-white/10 text-white"
                data-ocid="admin.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f30] border-white/10">
                <SelectItem value="all">All India</SelectItem>
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-white/60 text-xs mb-1.5 block">Category</p>
            <Select
              value={form.category}
              onValueChange={(v) => setField("category", v)}
            >
              <SelectTrigger
                className="bg-white/5 border-white/10 text-white"
                data-ocid="admin.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f30] border-white/10">
                {Object.entries(categoryLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-white/60 text-xs mb-1.5 block">
              Benefit Description
            </p>
            <Input
              value={form.benefit}
              onChange={(e) => setField("benefit", e.target.value)}
              placeholder="e.g. ₹6,000/year"
              className="bg-white/5 border-white/10 text-white"
              data-ocid="admin.input"
            />
          </div>

          <div>
            <p className="text-white/60 text-xs mb-1.5 block">
              Benefit Amount (Numeric)
            </p>
            <Input
              type="number"
              value={form.benefit_amount_numeric}
              onChange={(e) =>
                setField("benefit_amount_numeric", Number(e.target.value))
              }
              className="bg-white/5 border-white/10 text-white"
              data-ocid="admin.input"
            />
          </div>

          <div className="md:col-span-2">
            <p className="text-white/60 text-xs mb-1.5 block">Apply Link</p>
            <Input
              value={form.apply_link}
              onChange={(e) => setField("apply_link", e.target.value)}
              placeholder="https://..."
              className="bg-white/5 border-white/10 text-white"
              data-ocid="admin.input"
            />
          </div>

          <div className="md:col-span-2">
            <p className="text-white/60 text-xs mb-1.5 block">Description</p>
            <Textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className="bg-white/5 border-white/10 text-white resize-none"
              rows={3}
              data-ocid="admin.textarea"
            />
          </div>

          <div className="md:col-span-2">
            <p className="text-white/60 text-xs mb-1.5 block">Eligibility</p>
            <Textarea
              value={form.eligibility}
              onChange={(e) => setField("eligibility", e.target.value)}
              className="bg-white/5 border-white/10 text-white resize-none"
              rows={3}
              data-ocid="admin.textarea"
            />
          </div>

          <div>
            <p className="text-white/60 text-xs mb-1.5 block">
              Documents (one per line)
            </p>
            <Textarea
              value={docsText}
              onChange={(e) => setDocsText(e.target.value)}
              className="bg-white/5 border-white/10 text-white resize-none"
              rows={4}
              placeholder="Aadhaar card\nIncome certificate"
              data-ocid="admin.textarea"
            />
          </div>

          <div>
            <p className="text-white/60 text-xs mb-1.5 block">
              Tags (comma-separated)
            </p>
            <Textarea
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              className="bg-white/5 border-white/10 text-white resize-none"
              rows={4}
              placeholder="student, scholarship, education"
              data-ocid="admin.textarea"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20 text-white/70"
            data-ocid="admin.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="btn-gradient"
            disabled={!form.name.trim()}
            data-ocid="admin.save_button"
          >
            {initial ? "Update Scheme" : "Add Scheme"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem("adminAuth") === "true",
  );
  const { schemes, addScheme, updateScheme, deleteScheme, setSchemes } =
    useSchemesStore();
  const { actor } = useActor();

  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editScheme, setEditScheme] = useState<Scheme | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [importJson, setImportJson] = useState("");
  const [showImport, setShowImport] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = schemes.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async (data: SchemeFormData) => {
    const scheme: Scheme = {
      ...data,
      id: generateId(),
      slug: generateSlug(data.name),
      documents: data.documents,
      tags: data.tags,
    };
    addScheme(scheme);
    await addSchemeToCanister(actor, scheme);
    setShowAddDialog(false);
    toast.success(`"${scheme.name}" added successfully!`);
  };

  const handleEdit = async (data: SchemeFormData) => {
    if (!editScheme) return;
    const scheme: Scheme = {
      ...data,
      id: editScheme.id,
      slug: generateSlug(data.name),
      documents: data.documents,
      tags: data.tags,
    };
    updateScheme(scheme);
    await updateSchemeInCanister(actor, scheme);
    setEditScheme(null);
    toast.success(`"${scheme.name}" updated!`);
  };

  const handleDelete = async (id: string) => {
    const scheme = schemes.find((s) => s.id === id);
    deleteScheme(id);
    await deleteSchemeFromCanister(actor, id);
    setDeleteId(null);
    toast.success(`"${scheme?.name}" deleted.`);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(schemes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yojnaai-schemes.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported successfully!");
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJson) as Scheme[];
      if (!Array.isArray(parsed)) throw new Error("Must be an array");
      setSchemes([...schemes, ...parsed]);
      setImportJson("");
      setShowImport(false);
      toast.success(`Imported ${parsed.length} schemes!`);
    } catch (err) {
      toast.error(
        `Invalid JSON: ${err instanceof Error ? err.message : "unknown error"}`,
      );
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith(".json")) {
      const text = await file.text();
      try {
        const parsed = JSON.parse(text) as Scheme[];
        setSchemes([...schemes, ...parsed]);
        toast.success(`Imported ${parsed.length} schemes from JSON!`);
      } catch {
        toast.error("Invalid JSON file.");
      }
    } else if (file.name.endsWith(".docx")) {
      try {
        // Use CDN fallback for mammoth
        const mammoth = await new Promise<{
          extractRawText: (opts: { arrayBuffer: ArrayBuffer }) => Promise<{
            value: string;
          }>;
        }>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/mammoth@1/mammoth.browser.min.js";
          script.onload = () => resolve((window as any).mammoth);
          script.onerror = reject;
          document.head.appendChild(script);
        });
        const buffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buffer });
        toast.success(
          "DOCX text extracted! Please review and add schemes manually.",
          { duration: 5000 },
        );
        setImportJson(
          JSON.stringify([{ raw_text: result.value.slice(0, 500) }], null, 2),
        );
        setShowImport(true);
      } catch {
        toast.error("DOCX parsing failed. Please convert to JSON first.");
      }
    } else {
      toast.error("Please upload a .json or .docx file");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    document.title = "Admin Dashboard - YojnaAI";
  }, []);

  if (!isAuthed) {
    return <LoginForm onLogin={() => setIsAuthed(true)} />;
  }

  return (
    <PageTransition>
      <main style={{ background: "#0B0F1A", minHeight: "100vh" }}>
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-black text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-white/50 text-sm mt-1">
                    Managing {schemes.length} schemes across{" "}
                    {new Set(schemes.map((s) => s.category)).size} categories
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => setShowImport(true)}
                    className="border-white/20 text-white/70"
                    data-ocid="admin.secondary_button"
                  >
                    <Upload size={15} className="mr-1.5" /> Import
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    className="border-white/20 text-white/70"
                    data-ocid="admin.secondary_button"
                  >
                    <Download size={15} className="mr-1.5" /> Export JSON
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white/70"
                    onClick={() => fileInputRef.current?.click()}
                    data-ocid="admin.upload_button"
                  >
                    <Upload size={15} className="mr-1.5" /> Upload File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    onClick={() => setShowAddDialog(true)}
                    className="btn-gradient"
                    data-ocid="admin.primary_button"
                  >
                    <Plus size={15} className="mr-1.5" /> Add Scheme
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Schemes", value: schemes.length },
                  {
                    label: "Categories",
                    value: new Set(schemes.map((s) => s.category)).size,
                  },
                  {
                    label: "Central Schemes",
                    value: schemes.filter((s) => s.state === "all").length,
                  },
                  {
                    label: "State Schemes",
                    value: schemes.filter((s) => s.state !== "all").length,
                  },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4">
                    <p className="text-3xl font-black gradient-text">
                      {stat.value}
                    </p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Search */}
              <div className="relative max-w-sm">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <Input
                  placeholder="Search schemes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  data-ocid="admin.search_input"
                />
              </div>
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl overflow-hidden"
              data-ocid="admin.table"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-6 py-4 text-white/50 text-xs uppercase tracking-wider font-medium">
                        Scheme Name
                      </th>
                      <th className="text-left px-4 py-4 text-white/50 text-xs uppercase tracking-wider font-medium hidden md:table-cell">
                        Category
                      </th>
                      <th className="text-left px-4 py-4 text-white/50 text-xs uppercase tracking-wider font-medium hidden lg:table-cell">
                        State
                      </th>
                      <th className="text-left px-4 py-4 text-white/50 text-xs uppercase tracking-wider font-medium hidden md:table-cell">
                        Benefit
                      </th>
                      <th className="text-right px-6 py-4 text-white/50 text-xs uppercase tracking-wider font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((scheme, i) => (
                      <tr
                        key={scheme.id}
                        className="border-b border-white/5 hover:bg-white/3 transition-colors"
                        data-ocid={
                          `admin.row.${i + 1}` as `admin.row.${number}`
                        }
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-white text-sm">
                            {scheme.name}
                          </p>
                          <p className="text-white/40 text-xs mt-0.5">
                            {scheme.slug}
                          </p>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <Badge
                            variant="outline"
                            className="border-[#6C5CE7]/40 text-[#a78bfa] text-xs"
                          >
                            {categoryLabels[scheme.category] ?? scheme.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <span className="text-white/50 text-sm">
                            {scheme.state === "all"
                              ? "All India"
                              : scheme.state}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-[#00D4FF] text-sm font-medium">
                            ₹
                            {scheme.benefit_amount_numeric.toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditScheme(scheme)}
                              className="text-white/50 hover:text-white h-8 w-8 p-0"
                              data-ocid="admin.edit_button"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(scheme.id)}
                              className="text-red-400/60 hover:text-red-400 h-8 w-8 p-0"
                              data-ocid="admin.delete_button"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filtered.length === 0 && (
                  <div
                    className="text-center py-16"
                    data-ocid="admin.empty_state"
                  >
                    <p className="text-white/30">No schemes found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add/Edit Dialogs */}
        <SchemeFormDialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          onSave={handleAdd}
        />

        {editScheme && (
          <SchemeFormDialog
            open={!!editScheme}
            onClose={() => setEditScheme(null)}
            onSave={handleEdit}
            initial={editScheme}
          />
        )}

        {/* Delete confirmation */}
        <AlertDialog
          open={!!deleteId}
          onOpenChange={(o) => !o && setDeleteId(null)}
        >
          <AlertDialogContent
            className="bg-[#13182a] border-white/10 text-white"
            data-ocid="admin.dialog"
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Scheme?</AlertDialogTitle>
              <AlertDialogDescription className="text-white/60">
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="border-white/20 text-white/70"
                data-ocid="admin.cancel_button"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700 text-white"
                data-ocid="admin.confirm_button"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Import Dialog */}
        <Dialog
          open={showImport}
          onOpenChange={(o) => !o && setShowImport(false)}
        >
          <DialogContent
            className="bg-[#13182a] border-white/10 text-white max-w-2xl"
            data-ocid="admin.dialog"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Import Schemes
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImport(false)}
                  className="text-white/40 h-8 w-8 p-0"
                  data-ocid="admin.close_button"
                >
                  <X size={16} />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/50 text-sm">
              Paste a JSON array of schemes below:
            </p>
            <Textarea
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder='[{"name": "...", "category": "student", ...}]'
              className="bg-white/5 border-white/10 text-white font-mono text-xs min-h-[200px]"
              data-ocid="admin.textarea"
            />
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowImport(false)}
                className="border-white/20 text-white/70"
                data-ocid="admin.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleImportJson}
                className="btn-gradient"
                disabled={!importJson.trim()}
                data-ocid="admin.confirm_button"
              >
                Import
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Footer />
      </main>
    </PageTransition>
  );
}

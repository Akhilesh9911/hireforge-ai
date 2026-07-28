import React, { useState, useEffect } from 'react';
import {
  Briefcase, Plus, Search, Trash2, Building,
  Calendar, AlertCircle, Pencil, ChevronDown,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { JobApplication, JobStatus } from '../types';
import { jobService } from '../services/jobService';

const STATUS_OPTIONS: (JobStatus | 'ALL')[] = ['ALL', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];

const STATUS_LABELS: Record<JobStatus, string> = {
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
};

const getBadgeVariant = (status: JobStatus) => {
  switch (status) {
    case 'OFFER':      return 'success' as const;
    case 'INTERVIEW':  return 'warning' as const;
    case 'APPLIED':    return 'info' as const;
    case 'REJECTED':   return 'danger' as const;
    default:           return 'neutral' as const;
  }
};

const selectClass = "w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200";

export const JobTrackerPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Add modal ──
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    companyName: '', jobTitle: '',
    status: 'APPLIED' as JobStatus,
    appliedDate: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // ── Edit modal (status + all fields via status only since backend has PATCH /status) ──
  const [editJob, setEditJob] = useState<JobApplication | null>(null);
  const [editStatus, setEditStatus] = useState<JobStatus>('APPLIED');
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await jobService.getJobs();
      setJobs(list);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load job applications.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  // ── Add Job ──
  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.companyName.trim() || !addForm.jobTitle.trim()) return;
    setIsSaving(true);
    setAddError(null);
    try {
      await jobService.addJob({
        companyName: addForm.companyName.trim(),
        jobTitle: addForm.jobTitle.trim(),
        status: addForm.status,
        appliedDate: addForm.appliedDate || null,
        notes: addForm.notes.trim() || null,
      });
      setIsAddModalOpen(false);
      setAddForm({ companyName: '', jobTitle: '', status: 'APPLIED', appliedDate: new Date().toISOString().split('T')[0], notes: '' });
      fetchJobs();
    } catch (err: any) {
      setAddError(err?.response?.data?.message || 'Failed to add job application.');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Open Edit Modal ──
  const openEditModal = (job: JobApplication) => {
    setEditJob(job);
    setEditStatus(job.status);
    setEditError(null);
  };

  // ── Update Status → auto-moves to correct filter tab ──
  const handleUpdateStatus = async () => {
    if (!editJob) return;
    setIsUpdating(true);
    setEditError(null);
    try {
      const updated = await jobService.updateStatus(editJob.id, editStatus);
      // Update local state immediately — no re-fetch needed
      setJobs(prev => prev.map(j => j.id === updated.id ? updated : j));
      // Auto switch filter tab to match new status
      setSelectedStatus(editStatus);
      setEditJob(null);
    } catch (err: any) {
      setEditError(err?.response?.data?.message || 'Failed to update status.');
    } finally {
      setIsUpdating(false);
    }
  };

  // ── Delete ──
  const handleDeleteJob = async (id: number) => {
    if (!confirm('Delete this job application?')) return;
    try {
      await jobService.deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete application.');
    }
  };

  // ── Filter ──
  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || j.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Count per status for filter tabs
  const countByStatus = (st: JobStatus) => jobs.filter(j => j.status === st).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> Job Application Tracker
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Manage your career applications pipeline and track status progression.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Add Job
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search company or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>

            {/* Status Filter Tabs with counts */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
              {STATUS_OPTIONS.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedStatus === st
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {st === 'ALL' ? 'All' : STATUS_LABELS[st as JobStatus]}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    selectedStatus === st
                      ? 'bg-white/20 text-white'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                  }`}>
                    {st === 'ALL' ? jobs.length : countByStatus(st as JobStatus)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 px-5 py-4">
                  <div className="w-8 h-8 rounded-lg shimmer" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-36 rounded shimmer" />
                    <div className="h-2.5 w-24 rounded shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-10">
              <EmptyState
                title="No job applications found"
                description={
                  searchQuery || selectedStatus !== 'ALL'
                    ? 'No jobs match your current filters.'
                    : 'Get started by adding your first job application.'
                }
                actionLabel="Add Application"
                onAction={() => setIsAddModalOpen(true)}
              />
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-5">Company & Role</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Applied Date</th>
                  <th className="py-3 px-5">Notes</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {filteredJobs.map((j) => (
                  <tr key={j.id} className="hover:bg-violet-50/30 dark:hover:bg-violet-950/10 transition-colors group">
                    {/* Company & Role */}
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-md bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center shrink-0">
                          <Building className="w-3 h-3 text-violet-500" />
                        </div>
                        <span>{j.companyName}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 ml-7.5">{j.jobTitle}</p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-5">
                      <Badge variant={getBadgeVariant(j.status)}>
                        {STATUS_LABELS[j.status]}
                      </Badge>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-5 text-zinc-500 dark:text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-400 shrink-0" />
                        {j.appliedDate || '—'}
                      </span>
                    </td>

                    {/* Notes */}
                    <td className="py-3.5 px-5 text-zinc-500 dark:text-zinc-400 max-w-[180px] truncate">
                      {j.notes || '—'}
                    </td>

                    {/* Actions — Edit + Delete */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit / Change Status */}
                        <button
                          onClick={() => openEditModal(j)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 border border-violet-200 dark:border-violet-800/60 transition-all duration-200"
                          title="Change Status"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteJob(j.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* ── Add Job Modal ── */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Job Application"
        description="Enter application details to track your job search"
      >
        <form onSubmit={handleAddJob} className="space-y-4">
          {addError && (
            <div className="p-3 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{addError}</span>
            </div>
          )}

          <Input
            label="Company Name"
            value={addForm.companyName}
            onChange={(e) => setAddForm(f => ({ ...f, companyName: e.target.value }))}
            placeholder="e.g. Google"
            required
          />

          <Input
            label="Job Title"
            value={addForm.jobTitle}
            onChange={(e) => setAddForm(f => ({ ...f, jobTitle: e.target.value }))}
            placeholder="e.g. Software Engineer"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">Status</label>
              <select
                value={addForm.status}
                onChange={(e) => setAddForm(f => ({ ...f, status: e.target.value as JobStatus }))}
                className={selectClass}
              >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <Input
              label="Date Applied"
              type="date"
              value={addForm.appliedDate}
              onChange={(e) => setAddForm(f => ({ ...f, appliedDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">Notes (Optional)</label>
            <textarea
              rows={3}
              value={addForm.notes}
              onChange={(e) => setAddForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="e.g. Referral from John, Tech screen scheduled..."
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-all"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm" isLoading={isSaving}>Save Application</Button>
          </div>
        </form>
      </Modal>

      {/* ── Edit Status Modal ── */}
      <Modal
        isOpen={!!editJob}
        onClose={() => setEditJob(null)}
        title="Update Application Status"
        description={`${editJob?.companyName} — ${editJob?.jobTitle}`}
      >
        <div className="space-y-5">
          {/* Current status display */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Current Status</span>
            {editJob && (
              <Badge variant={getBadgeVariant(editJob.status)}>
                {STATUS_LABELS[editJob.status]}
              </Badge>
            )}
          </div>

          {/* New status selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Change Status To
            </label>

            {/* Visual status picker — cards */}
            <div className="grid grid-cols-2 gap-2">
              {(['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'] as JobStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setEditStatus(st)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    editStatus === st
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    st === 'OFFER' ? 'bg-emerald-500' :
                    st === 'INTERVIEW' ? 'bg-amber-500' :
                    st === 'APPLIED' ? 'bg-violet-500' :
                    'bg-zinc-400'
                  }`} />
                  {STATUS_LABELS[st]}
                  {editStatus === st && (
                    <span className="ml-auto text-violet-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {editError && (
            <div className="p-3 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{editError}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => setEditJob(null)}>Cancel</Button>
            <Button
              size="sm"
              isLoading={isUpdating}
              disabled={editStatus === editJob?.status}
              onClick={handleUpdateStatus}
            >
              Update Status
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

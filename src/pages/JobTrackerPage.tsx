import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { JobApplication, JobStatus } from '../types';
import { jobService } from '../services/jobService';

export const JobTrackerPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  // Form states for Add/Edit Modal
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState<JobStatus>('Applied');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const fetchJobs = async () => {
    const list = await jobService.getJobs();
    setJobs(list);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const resetForm = () => {
    setCompany('');
    setPosition('');
    setStatus('Applied');
    setLocation('');
    setSalary('');
    setDateApplied(new Date().toISOString().split('T')[0]);
    setNotes('');
    setJobUrl('');
    setContactEmail('');
    setEditingJob(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (j: JobApplication) => {
    setEditingJob(j);
    setCompany(j.company);
    setPosition(j.position);
    setStatus(j.status);
    setLocation(j.location);
    setSalary(j.salary || '');
    setDateApplied(j.dateApplied);
    setNotes(j.notes || '');
    setJobUrl(j.jobUrl || '');
    setContactEmail(j.contactEmail || '');
    setIsAddModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !position) return;

    if (editingJob) {
      await jobService.updateJob(editingJob.id, {
        company,
        position,
        status,
        location,
        salary,
        dateApplied,
        notes,
        jobUrl,
        contactEmail,
      });
    } else {
      await jobService.addJob({
        company,
        position,
        status,
        location,
        salary,
        dateApplied,
        notes,
        jobUrl,
        contactEmail,
      });
    }

    setIsAddModalOpen(false);
    resetForm();
    fetchJobs();
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      await jobService.deleteJob(id);
      fetchJobs();
    }
  };

  // Filter logic
  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || j.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getBadgeVariant = (st: JobStatus) => {
    switch (st) {
      case 'Offer':
        return 'success';
      case 'Interviewing':
        return 'warning';
      case 'Applied':
        return 'info';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const statusOptions: (JobStatus | 'All')[] = ['All', 'Saved', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> Job Application Tracker
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Manage your career applications pipeline, track status progression, and log interview details.
          </p>
        </div>

        <Button size="sm" onClick={openAddModal} icon={<Plus className="w-4 h-4" />}>
          Add Job
        </Button>
      </div>

      {/* Search & Filter Toolbar */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Filter by company or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    selectedStatus === st
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table Card */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {filteredJobs.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No job applications found"
                description={
                  searchQuery || selectedStatus !== 'All'
                    ? 'No jobs match your search filters.'
                    : 'Get started by adding your first job application.'
                }
                actionLabel="Add Application"
                onAction={openAddModal}
              />
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Company & Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Compensation</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {filteredJobs.map((j) => (
                  <tr key={j.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{j.company}</span>
                        {j.jobUrl && (
                          <a
                            href={j.jobUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ml-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{j.position}</p>
                    </td>

                    <td className="py-3 px-4">
                      <Badge variant={getBadgeVariant(j.status)}>
                        {j.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" /> {j.location}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300 font-mono">
                      {j.salary || '—'}
                    </td>

                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 font-mono">
                      {j.dateApplied}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(j)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(j.id)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
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

      {/* Add/Edit Job Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingJob ? 'Edit Job Application' : 'Add New Job Application'}
        description="Enter application details to track your job search"
      >
        <form onSubmit={handleSaveJob} className="space-y-3.5">
          <Input
            label="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Corp"
            required
          />

          <Input
            label="Position / Role Title"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Software Engineer"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Application Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs py-2 px-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="Saved">Saved</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote / San Francisco"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Salary Range (Optional)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. $150,000 - $180,000"
            />

            <Input
              label="Date Applied"
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
            />
          </div>

          <Input
            label="Job Posting URL (Optional)"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://..."
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Interviewer / Follow-up Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Tech screen scheduled with Senior Engineering Lead..."
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingJob ? 'Update Application' : 'Save Application'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

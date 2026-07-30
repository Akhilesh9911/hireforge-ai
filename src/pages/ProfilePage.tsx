import React, { useState } from 'react';
import {
  User,
  Mail,
  Briefcase,
  Server,
  RefreshCw,
  Save,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Code2,
  Terminal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export const ProfilePage: React.FC = () => {
  const {
    user,
    updateUser,
    logout,
    apiBaseUrl,
    setApiBaseUrl,
    isBackendConnected,
    recheckBackendHealth
  } = useAuth();

  const [name, setName] = useState(user?.name || 'User');
  const [role, setRole] = useState(user?.role || 'Software Engineer');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Engineer');
  const [tempApiUrl, setTempApiUrl] = useState(apiBaseUrl);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isTestingHealth, setIsTestingHealth] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ name, role, targetRole });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveApiUrl = async () => {
    setApiBaseUrl(tempApiUrl);
    setIsTestingHealth(true);
    await recheckBackendHealth();
    setIsTestingHealth(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <User className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> Account & Profile Settings
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Manage your account profile details, career target preferences, and connection settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1 text-center p-6 space-y-4">
          <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-2xl text-zinc-700 dark:text-zinc-200 mx-auto border-2 border-zinc-300 dark:border-zinc-700 overflow-hidden">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.[0] || 'U'}</span>
            )}
          </div>

          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{user?.name}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{user?.email}</p>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-left text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Current Title</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{user?.role || 'Developer'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Target Role</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">{user?.targetRole || 'Java Engineer'}</span>
            </div>
          </div>

          <Button
            variant="danger"
            size="sm"
            className="w-full mt-4"
            onClick={logout}
            icon={<LogOut className="w-3.5 h-3.5" />}
          >
            Logout
          </Button>
        </Card>

        {/* Edit Profile & API Config Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Edit Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Edit Personal Details</CardTitle>
              <CardDescription className="text-xs">
                Update account information and target career preferences
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<User className="w-4 h-4" />}
                />

                <Input
                  label="Email Address"
                  value={user?.email || ''}
                  disabled
                  hint="Email address linked to account"
                  icon={<Mail className="w-4 h-4" />}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Current Job Title"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    icon={<Briefcase className="w-4 h-4" />}
                  />

                  <Input
                    label="Target Career Role"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    icon={<Code2 className="w-4 h-4" />}
                  />
                </div>

                {saveSuccess && (
                  <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Profile updated successfully!</span>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Service Connection Config Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-zinc-700 dark:text-zinc-300" /> API Endpoint Configuration
                </CardTitle>
                <CardDescription className="text-xs">
                  Configure custom API server URL (e.g. http://localhost:8080/api)
                </CardDescription>
              </div>

              <Badge variant={isBackendConnected ? 'success' : 'neutral'} size="sm">
                {isBackendConnected ? 'Connected' : 'Offline'}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  label="API Base URL"
                  value={tempApiUrl}
                  onChange={(e) => setTempApiUrl(e.target.value)}
                  placeholder="http://localhost:8080/api"
                  icon={<Terminal className="w-4 h-4" />}
                />

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Configure the base endpoint URL for API communication.
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    setIsTestingHealth(true);
                    await recheckBackendHealth();
                    setIsTestingHealth(false);
                  }}
                  isLoading={isTestingHealth}
                  icon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Test Connection
                </Button>

                <Button size="sm" onClick={handleSaveApiUrl}>
                  Update API URL
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

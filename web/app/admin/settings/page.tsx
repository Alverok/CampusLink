"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Bell, Sun, Moon, LogOut, KeyRound } from "lucide-react";
import { useSupabase } from "@/components/supabase-provider";

export default function SettingsPage() {
  const router = useRouter();
  const { supabase } = useSupabase();

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [inAppNotifs, setInAppNotifs] = useState(true);

  // change password modal state
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  // Logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      alert("Failed to logout. Check console.");
    }
  };

  // Change password
  const handleChangePassword = async () => {
    const isStrong = (pw: string) =>
      pw.length >= 6 &&
      /[a-z]/.test(pw) &&
      /[A-Z]/.test(pw) &&
      /\d/.test(pw) &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|<>?,./`~]/.test(pw);

    const generateEasyPassword = () => {
      // simple, easy-to-read password that meets requirements: Upper, lower, digit, special
      // Example pattern: Ab1!abc (7 chars)
      return "Ab1!abc";
    };

    // if user provided a password, validate it; if weak, autofill with an easy compliant password
    if (!isStrong(newPassword)) {
      const auto = generateEasyPassword();
      setNewPassword(auto);
      setConfirmPassword(auto);
      alert(`Password was too weak. Autofilled an easy compliant password: ${auto}`);
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setPwLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert("✅ Password updated successfully.");
      setShowChangeModal(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Change password error:", err);
      alert(err?.message || "Failed to change password.");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#fdf8f6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7c183d] flex items-center gap-2">
          <Settings className="w-6 h-6" /> Settings
        </h1>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-8">
        {/* General Preferences */}
        <section>
          <h2 className="text-lg font-semibold text-[#7c183d] mb-4">
            General Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C1810]">
                Office / Department
              </label>
              <input
                type="text"
                value="CSE Office - Coimbatore Campus"
                disabled
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed text-[#2C1810] font-medium"
              />
            </div>

            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                <span className="font-medium text-[#2C1810]">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  darkMode ? "bg-[#7c183d]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-lg font-semibold text-[#7c183d] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notification Preferences
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between border p-3 rounded-md">
              <span className="text-[#2C1810] font-medium">Email Notifications</span>
              <button
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  emailNotifs ? "bg-[#7c183d]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailNotifs ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between border p-3 rounded-md">
              <span className="text-[#2C1810] font-medium">In-App Alerts</span>
              <button
                onClick={() => setInAppNotifs(!inAppNotifs)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  inAppNotifs ? "bg-[#7c183d]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    inAppNotifs ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section>
          <h2 className="text-lg font-semibold text-[#7c183d] mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C1810]">
                Admin Name
              </label>
              <input
                type="text"
                value="Dr. Karthik Kishor"
                disabled
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed text-[#2C1810] font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C1810]">
                Admin Email
              </label>
              <input
                type="email"
                value="cseoffice@amrita.edu"
                disabled
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed text-[#2C1810] font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C1810]">
                Role
              </label>
              <input
                type="text"
                value="Department Admin"
                disabled
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed text-[#2C1810] font-medium"
              />
            </div>

            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-gray-600" />
                <span className="text-[#2C1810] font-medium">Change Password</span>
              </div>
              <button onClick={() => setShowChangeModal(true)} className="text-[#7c183d] hover:underline font-medium">Change</button>
            </div>

            <div className="flex justify-end">
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Change Password Modal */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-[#7c183d] mb-3">Change Password</h3>
            <p className="text-sm text-gray-600 mb-4">Enter a new password for your account.</p>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-3 text-[#2C1810] font-medium placeholder:text-[#bfaea6] focus:outline-none focus:ring-2 focus:ring-[#8B1538]/30"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-4 text-[#2C1810] font-medium placeholder:text-[#bfaea6] focus:outline-none focus:ring-2 focus:ring-[#8B1538]/30"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowChangeModal(false)} className="bg-gray-200 px-3 py-2 rounded-md">Cancel</button>
              <button onClick={handleChangePassword} disabled={pwLoading} className="bg-[#7c183d] text-white px-3 py-2 rounded-md">
                {pwLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
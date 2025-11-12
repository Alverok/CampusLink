"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, Edit, Trash2 } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function ClassroomsPage() {
  const supabase = supabaseBrowser;
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [formData, setFormData] = useState({
    room_no: "",
    building: "",
    capacity: "",
    status: "Available",
  });

  // Fetch all classrooms
  const fetchClassrooms = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("classrooms").select("*").order("building");
    if (!error && data) setClassrooms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  // Handle Add / Update
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.room_no || !formData.building) {
      alert("Room number and building are required.");
      return;
    }

    try {
      if (editing) {
        const { error } = await supabase
          .from("classrooms")
          .update(formData)
          .eq("id", editing.id);
        if (error) throw error;
        alert("✅ Classroom updated successfully!");
      } else {
        const { error } = await supabase.from("classrooms").insert([formData]);
        if (error) throw error;
        alert("✅ Classroom added successfully!");
      }

      setShowModal(false);
      setEditing(null);
      setFormData({ room_no: "", building: "", capacity: "", status: "Available" });
      fetchClassrooms();
    } catch (error: any) {
      console.error(error.message);
      alert("❌ Failed to save classroom.");
    }
  };

  // Delete classroom
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this classroom?")) return;
    const { error } = await supabase.from("classrooms").delete().eq("id", id);
    if (error) {
      console.error(error.message);
      alert("❌ Failed to delete classroom.");
    } else {
      alert("🗑️ Classroom deleted!");
      fetchClassrooms();
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#8B1538] flex items-center gap-2">
          <Building2 className="w-7 h-7" /> Classroom Management
        </h1>
        <button
          onClick={() => {
            setEditing(null);
            setFormData({ room_no: "", building: "", capacity: "", status: "Available" });
            setShowModal(true);
          }}
          className="bg-[#8B1538] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#A01842]"
        >
          <Plus className="w-4 h-4" /> Add Classroom
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading classrooms...</p>
      ) : classrooms.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No classrooms found.</p>
      ) : (
        <div className="bg-white border border-[#8B1538]/20 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-[#F5E6D3]/70">
              <tr>
                <th className="text-left py-3 px-4 text-[#8B1538] border-b">Room No</th>
                <th className="text-left py-3 px-4 text-[#8B1538] border-b">Building</th>
                <th className="text-left py-3 px-4 text-[#8B1538] border-b">Capacity</th>
                <th className="text-left py-3 px-4 text-[#8B1538] border-b">Status</th>
                <th className="text-left py-3 px-4 text-[#8B1538] border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map((room) => (
                <tr key={room.id} className="border-b hover:bg-[#F5E6D3]/40">
                  <td className="py-3 px-4">{room.room_no}</td>
                  <td className="py-3 px-4">{room.building}</td>
                  <td className="py-3 px-4">{room.capacity || "-"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : room.status === "Occupied"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-3 text-sm">
                    <button
                      onClick={() => {
                        setEditing(room);
                        setFormData(room);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-[#8B1538] mb-4">
              {editing ? "Edit Classroom" : "Add Classroom"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Room Number"
                className="w-full border rounded-lg p-2"
                value={formData.room_no}
                onChange={(e) => setFormData({ ...formData, room_no: e.target.value })}
              />
              <input
                type="text"
                placeholder="Building"
                className="w-full border rounded-lg p-2"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
              />
              <input
                type="number"
                placeholder="Capacity"
                className="w-full border rounded-lg p-2"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
              <select
                className="w-full border rounded-lg p-2"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Available</option>
                <option>Occupied</option>
                <option>Maintenance</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#A01842]"
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

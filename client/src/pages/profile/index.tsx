import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust path
import { useAuth } from "@/context/auth";
import UserLayout from "@/components/user-layout";
import { Card } from "@/components/ui/card";
import Field from "@/components/form/field";
import InputField from "@/components/form/field";
import TextareaField from "@/components/form/text-area-field";
import { updateProfile } from "@/api/profile";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    description: user?.description || "",
  });

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    await updateProfile({
      data: { username: formData.username, description: formData.description },
      userId: user?._id,
      successCallback: () => {
        setSaving(false);
      },
      errorCallback: () => {
        setSaving(false);
      },
    });
  };

  return (
    <UserLayout title="Edit your user profile settings">
      <Card className="max-w-xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Field
            id="username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />

          <InputField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />

          <TextareaField
            label="Description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </UserLayout>
  );
};

export default ProfilePage;

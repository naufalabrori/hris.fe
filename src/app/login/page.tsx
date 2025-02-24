import { LoginForm } from "@/components/modules/Login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center gap-6 bg-muted p-6 md:p-10">
      <LoginForm />
    </div>
  );
}

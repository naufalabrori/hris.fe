'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputField from '@/components/common/Input/InputField';

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Your new password will be sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <div className="font-bold">Email Address</div>
                <InputField placeholder="Enter your email" required />
              </div>
              <Button
                type="submit"
                className="w-full font-bold bg-[#D84D26] hover:bg-[#d84d26] text-lg"
              >
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

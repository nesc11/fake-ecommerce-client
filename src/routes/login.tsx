import {
  type ActionFunction,
  redirect,
  Form,
  Link,
  useNavigate,
} from "react-router-dom";
import { ReduxStore } from "@/app/store";
import { AxiosError, AxiosResponse } from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { FormInput, SubmitBtn } from "@/components";
import { customFetch } from "@/utils";
import { useAppDispatch } from "@/app/hooks";
import { loginUser } from "@/features/user/userSlice";

// Action
export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response: AxiosResponse = await customFetch.post(
        "/auth/local",
        data,
      );
      store.dispatch(
        loginUser({
          username: response.data.user.username,
          jwt: response.data.jwt,
        }),
      );
      toast({ description: "User logged in successfully" });
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.error.message
          : "Authentication failed";
      toast({ description: errorMessage });
      return null;
    }
  };

// Route
export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginAsGuest = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(
        loginUser({
          username: response.data.user.username,
          jwt: response.data.jwt,
        }),
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({ description: "Login failed" });
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FormInput type="email" label="email" name="identifier" />
            <FormInput type="password" name="password" />
            <SubmitBtn text="Login" className="w-full mt-4" />
            <Button
              type="button"
              variant="outline"
              onClick={loginAsGuest}
              className="w-full mt-4"
            >
              Guest user
            </Button>
            <p className="text-center mt-4">
              Not a member yet?{" "}
              <Button type="button" asChild variant="link">
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

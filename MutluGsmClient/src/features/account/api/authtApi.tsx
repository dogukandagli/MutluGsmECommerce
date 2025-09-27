import queries from "../../../shared/lib/apiClient";

const Auth = {
  login: (formData: any) => queries.post("auth/login", formData),
};

export default Auth;

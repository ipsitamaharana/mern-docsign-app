import { useParams } from "react-router-dom";

function SignPage() {
  const { token } = useParams();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">
        Public Signature Page
      </h1>

      <p className="text-lg">
        Token:
      </p>

      <p className="bg-gray-200 p-3 rounded mt-2">
        {token}
      </p>
    </div>
  );
}

export default SignPage;
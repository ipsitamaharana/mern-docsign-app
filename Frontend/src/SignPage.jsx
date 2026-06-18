import { useState } from "react";
import { useParams } from "react-router-dom";

function SignPage() {
  const { token } = useParams();

  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSign = async () => {
    console.log("Sign button clicked");
    try {
      const res = await fetch(
        `http://localhost:5000/api/signatures/sign/${token}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Error signing document");
    }
  };

  const handleReject = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/signatures/reject/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason,
          }),
        }
      );

      const data = await res.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Error rejecting document");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl font-bold">
        Public Signature Page
      </h1>

      <p className="bg-gray-200 p-3 rounded">
        {token}
      </p>

      <button
        onClick={handleSign}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Sign Document
      </button>

      <textarea
        placeholder="Enter rejection reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="border p-2 w-80"
      />

      <button
        onClick={handleReject}
        className="bg-red-600 text-white px-6 py-2 rounded"
      >
        Reject Document
      </button>

      {message && (
        <p className="font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}

export default SignPage;
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDraftMutation } from "../listingApiSlice";

function PreListing() {
  const navigate = useNavigate();
  const [createDraft] = useCreateDraftMutation();
  const [loading, setLoading] = useState(false);
  const isCreatingDraft = useRef(false); // useRef to persist the flag across renders

  const handleCreateListing = useCallback(async () => {
    if (isCreatingDraft.current) return;
    isCreatingDraft.current = true;
    setLoading(true);
    try {
      const draft = await createDraft().unwrap();
      navigate(`/selling/create-listing?draftId=${draft._id}`);
    } catch (error) {
      console.error("Failed to generate draft ID:", error);
      navigate(-1);
    } finally {
      setLoading(false);
      isCreatingDraft.current = false;
    }
  }, [createDraft, navigate]);

  useEffect(() => {
    handleCreateListing();
  }, [handleCreateListing]);

  return <div>{loading ? "Creating draft..." : "Ready"}</div>;
}

export default PreListing;

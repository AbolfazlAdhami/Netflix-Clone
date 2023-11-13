import React, { useCallback } from "react";
import useBillboard from "@/hooks/useBillboard";
import useInfoModalStore from "@/hooks/useInfoModalStore";

import PlayButoon from "@/components/PlayButton";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const Billboard: React.FC = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModalStore();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data]);

  return <div className="relative h-[56.25vw]"></div>;
};

export default Billboard;

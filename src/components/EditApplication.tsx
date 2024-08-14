import { updateApplication } from "@/lib/data";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";

export default function EditApplication({
  recordId,
  company,
  position,
  status,
  postingLink,
  notes,
}: {
  recordId: string;
  company: string;
  position: string;
  status: string;
  notes: string | null | undefined;
  postingLink: string | null | undefined;
}) {
  // format date so that the default date for updating an application is the current day
  const today = new Date(); // new date as today will be the latest updated
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const statusOptions = [
    { label: "Applied", value: "applied" },
    { label: "Interview", value: "interview" },
    { label: "Offer", value: "offer" },
    { label: "Rejected", value: "rejected" },
  ];
  const [selectItem, setSelectItem] = useState(status);
  const [inputCompany, setInputCompanyy] = useState(company);
  const [inputPosition, setInputPosition] = useState(position);
  const [inputNotes, setInputNotes] = useState(notes);
  const [inputPostingLink, setInputPostingLink] = useState(postingLink);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectItem(e.target.value);
  };

  const resetInputsToRowVals = () => {
    setInputCompanyy(company);
    setSelectItem(status);
    setInputPosition(position);
    setInputNotes(notes);
    setInputPostingLink(postingLink);
  };

  return (
    <>
      <Button isIconOnly onPress={onOpen} variant="flat" color="primary">
        <FaPen />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Application
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (e.currentTarget.checkValidity()) {
                      const formData = new FormData(e.currentTarget);
                      updateApplication(formData);
                      onClose();
                    }
                  }}
                >
                  <Input
                    isRequired
                    type="text"
                    name="company"
                    label="Company"
                    variant="bordered"
                    className="mt-3"
                    value={inputCompany}
                    onChange={(e) => setInputCompanyy(e.target.value)}
                  />
                  <Input
                    isRequired
                    type="text"
                    name="position"
                    label="Position"
                    variant="bordered"
                    className="mt-3"
                    value={inputPosition}
                    onChange={(e) => setInputPosition(e.target.value)}
                  />
                  <Select
                    label="Status"
                    className="mt-3"
                    variant="bordered"
                    name="status"
                    isRequired
                    onChange={handleSelectChange}
                    value={selectItem}
                    items={statusOptions}
                    defaultSelectedKeys={[status]}
                  >
                    {(option) => (
                      <SelectItem key={option.value}>{option.label}</SelectItem>
                    )}
                  </Select>
                  <Textarea
                    label="Notes"
                    name="notes"
                    className="mt-3"
                    variant="bordered"
                    value={inputNotes || ""}
                    onChange={(e) => setInputNotes(e.target.value)}
                  />
                  <Input
                    type="text"
                    name="postingLink"
                    label="Posting Link"
                    variant="bordered"
                    className="mt-3"
                    value={inputPostingLink || ""}
                    onChange={(e) => setInputPostingLink(e.target.value)}
                  />
                  <Input
                    type="date"
                    name="date"
                    label="Date for status change"
                    placeholder="MM/DD/YYYY"
                    defaultValue={formattedDate}
                    variant="bordered"
                    className="mt-3"
                  />
                  <input type="hidden" name="id" value={recordId} />
                  <Button
                    color="success"
                    variant="bordered"
                    type="submit"
                    className="mt-5"
                    startContent={<FaSave />}
                  >
                    save
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      onClose();
                      resetInputsToRowVals();
                    }}
                    className="ml-3"
                  >
                    cancel
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

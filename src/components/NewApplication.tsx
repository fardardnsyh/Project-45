import { addApplication } from "@/lib/data";
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
import { FaPlus } from "react-icons/fa";

export default function NewApplication({
  userEmail,
}: {
  userEmail: string | null | undefined;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const statusOptions = [
    { label: "Applied", value: "applied" },
    { label: "Interview", value: "interview" },
    { label: "Offer", value: "offer" },
    { label: "Rejected", value: "rejected" },
  ];
  const [selectItem, setSelectItem] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectItem(e.target.value);
  };

  return (
    <>
      <Button onPress={onOpen} variant="bordered" color="default">
        <FaPlus /> application
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Application
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (e.currentTarget.checkValidity()) {
                      const formData = new FormData(e.currentTarget);
                      addApplication(formData);
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
                  />
                  <Input
                    isRequired
                    type="text"
                    name="position"
                    label="Position"
                    variant="bordered"
                    className="mt-3"
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
                  />
                  <Input
                    type="text"
                    name="postingLink"
                    label="Posting Link"
                    variant="bordered"
                    className="mt-3"
                  />
                  <Input
                    isRequired
                    type="date"
                    name="date"
                    label="Date for status"
                    placeholder="MM/DD/YYYY"
                    variant="bordered"
                    className="mt-3"
                  />
                  <input type="hidden" name="userId" value={userEmail ?? ""} />
                  <Button
                    color="success"
                    variant="bordered"
                    type="submit"
                    className="mt-5"
                  >
                    submit
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
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

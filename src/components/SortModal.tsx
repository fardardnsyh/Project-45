"use client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";

export default function SortModal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterStatus = ["applied", "interview", "offer", "rejected"];

  const handleRadioChange = (label: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    switch (label) {
      case "Position":
        params.set("position", value);
        break;
      case "Company":
        params.set("company", value);
        break;
      case "Status":
        params.set("status", value);
        break;
      case "Date":
        params.set("lastUpdated", value);
        break;
      default:
        break;
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value.length !== 0) {
      params.set("filterStatus", e.target.value);
    } else {
      params.delete("filterStatus");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const clearSorts = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("position");
    params.delete("company");
    params.delete("status");
    params.delete("lastUpdated");
    params.delete("filterStatus");
    replace(`${pathname}?${params.toString()}`);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly onPress={onOpen} variant="flat" color="default">
        <FaFilter />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-96">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sort & Filter Rows
              </ModalHeader>
              <ModalBody>
                <div>
                  <Select
                    selectionMode="multiple"
                    label="Filter by Status(es)"
                    size="sm"
                    labelPlacement="outside-left"
                    variant="bordered"
                    onChange={handleSelectChange}
                    selectedKeys={
                      searchParams.get("filterStatus")?.split(",") || []
                    }
                  >
                    {filterStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Divider />
                <div className="flex gap-2 mb-3">
                  <p className="w-20">Position</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("position")?.toString() || ""} //! has to be or empty string because the checked radio button will not clear
                    onChange={(e) => {
                      handleRadioChange("Position", e.target.value);
                    }}
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <div className="flex gap-2 mb-3">
                  <p className="w-20">Company</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("company")?.toString() || ""}
                    onChange={(e) =>
                      handleRadioChange("Company", e.target.value)
                    }
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <div className="flex gap-2 mb-3">
                  <p className="w-20">Status</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("status")?.toString() || ""}
                    onChange={(e) =>
                      handleRadioChange("Status", e.target.value)
                    }
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <div className="flex gap-2 mb-3">
                  <p className="w-20">Date</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={searchParams.get("lastUpdated")?.toString() || ""}
                    onChange={(e) => handleRadioChange("Date", e.target.value)}
                  >
                    <Radio value="asc" className="mr-2">
                      asc
                    </Radio>
                    <Radio value="desc">desc</Radio>
                  </RadioGroup>
                </div>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    clearSorts();
                  }}
                >
                  clear
                </Button>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

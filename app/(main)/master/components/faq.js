"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import faqs from "./faqs";
import { createClient } from "../../../../utils/supabase/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Pagination,
} from "@nextui-org/react";

export default function Component() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const supabase = createClient();
  const [faqs, setFaqs] = useState([]);
  const [editMode, setEditMode] = useState("작성");
  const [faqId, setFaqId] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchFAQs = async () => {
    const { data, error, count } = await supabase
      .from("faq")
      .select("*", { count: "exact" })
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);
    if (error) {
      console.error("Error fetching FAQs:", error);
    } else {
      setFaqs(data);
      console.log("Fetched FAQs:", data);
      setTotalPages(Math.ceil(count / pageSize));
      console.log("Total FAQs:", count);
    }
  };
  useEffect(() => {
    fetchFAQs();
  }, [currentPage, pageSize]);

  const handleAdd = async () => {
    const { data, error } = await supabase.from("faq").insert([
      {
        question: question,
        answer: answer,
      },
    ]);

    if (error) {
      console.error("Error inserting FAQ:", error);
    } else {
      console.log("FAQ inserted successfully:", data);
      setQuestion(""); // Clear the input field after successful submission
      setAnswer(""); // Clear the input field after successful submission
      fetchFAQs(); // Refresh the FAQs after insertion
    }
  };
  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from("faq")
      .update({
        question: question,
        answer: answer,
      })
      .eq("id", faqId);
    if (error) {
      console.error("Error updating FAQ:", error);
    } else {
      console.log("FAQ updated successfully:", data);
      fetchFAQs(); // Refresh the FAQs after update
    }
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase.from("faq").delete().eq("id", id);
    if (error) {
      console.error("Error deleting FAQ:", error);
    } else {
      console.log("FAQ deleted successfully:", data);
      fetchFAQs(); // Refresh the FAQs after deletion
    }
  };
  console.log("editMode:", editMode);

  return (
    <section className="mx-auto w-full md:px-10 md:py-10 px-5 py-5 ">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                추가하기
              </ModalHeader>
              <ModalBody>
                <h2 className="text-sm font-medium">글번호</h2>
                <Input value={faqId} type="text" label="" disabled />
                <h2 className="text-sm font-medium">질문</h2>
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type="text"
                  label=""
                />
                <h2 className="text-sm font-medium">답변</h2>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  label=""
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (editMode === "작성") {
                      handleAdd();
                    } else {
                      handleUpdate();
                    }
                    onClose();
                  }}
                >
                  저장
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="mx-auto flex w-full flex-col items-center gap-8">
        <div className="flex justify-end w-full">
          <Button
            onClick={() => {
              onOpen();
              setEditMode("작성");
            }}
            color=""
            size="sm"
            variant="bordered"
          >
            작성하기
          </Button>
        </div>

        <Accordion
          fullWidth
          keepContentMounted
          itemClasses={{
            base: "px-0 md:px-2 md:px-6",
            title: "font-medium",
            trigger: "py-6 flex-row-reverse",
            content: "pt-0 pb-6 text-base text-default-500",
            indicator: "rotate-0 data-[open=true]:-rotate-45",
          }}
          items={faqs}
          selectionMode="multiple"
        >
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              indicator={
                <Icon className="text-gray-500" icon="lucide:plus" width={24} />
              }
              title={item.question}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>{item.answer}</p>
                </div>
                <div className="flex gap-x-2">
                  <Button
                    onClick={() => {
                      setEditMode("수정");
                      onOpen();
                      setQuestion(item.question);
                      setAnswer(item.answer);
                      setFaqId(item.id);
                    }}
                    color=""
                    size="sm"
                    variant="bordered"
                  >
                    수정
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    color=""
                    size="sm"
                    variant="bordered"
                  >
                    삭제
                  </Button>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex w-full justify-center my-5">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </section>
  );
}

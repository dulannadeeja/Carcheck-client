import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

type PaginationControllerProps = {
    totalPages: number;
    currentPage: number;
    totalRecords: number;
    setPageNumber: (page: number) => void;
};

function PaginationController({
    totalPages,
    currentPage,
    totalRecords,
    setPageNumber,
}: PaginationControllerProps) {
    const [inputPage, setInputPage] = useState(currentPage.toString());

    useEffect(() => {
        setInputPage(currentPage.toString());  // Sync input with page changes
    }, [currentPage]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPage = event.target.value;
        if (newPage === "" || (isFinite(+newPage) && +newPage >= 1 && +newPage <= totalPages)) {
            setInputPage(newPage); // Update input if empty or within range
        }
    };

    const applyPageChange = () => {
        const pageInt = parseInt(inputPage, 10);
        if (pageInt >= 1 && pageInt <= totalPages) {
            setPageNumber(pageInt);
        }
    };

    const handleInputBlur = () => {
        applyPageChange();
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            applyPageChange();
        }
    };

    return (
        <div className="flex gap-4 justify-between items-center border-t pt-3 mt-5">
            <p className="text-sm font-medium">
                Showing {totalRecords} records, Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-3 items-center">
                <Button
                    intent="primary"
                    size="small"
                    disabled={currentPage <= 1}
                    onClick={() => setPageNumber(currentPage - 1)}
                    className="shrink-0"
                >
                    Previous
                </Button>
                <div className="flex gap-2 items-center text-sm">
                    <span>Go to</span>
                    <Input
                        type="text"
                        className="h-7 w-10 text-center"
                        value={inputPage}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyPress={handleInputKeyPress}
                    />
                    <span>of {totalPages}</span>
                </div>
                <Button
                    intent="primary"
                    size="small"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPageNumber(currentPage + 1)}
                    className="shrink-0"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default PaginationController;

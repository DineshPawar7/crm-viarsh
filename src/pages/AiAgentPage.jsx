import React, { useEffect, useState } from "react";
import PageTitle from "../components/layout/PageTitle";
import { Edit, Trash, Plus, Search, RefreshCcwDot } from "lucide-react";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Th from "../components/common/Th";
import Td from "../components/common/Td";
import data from "../data/agents-data.json";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import CustomCheckbox from "../components/common/CustomCheckbox";
import { usePagination } from "../hooks/usePagination";
import { useRowSelection } from "../hooks/useRowSelection";
import { RefreshCcw } from "lucide";
import { Navigate, useNavigate } from "react-router-dom";
import TableActionButton from "../components/TableActionButton";
import UpDownIcon from "../components/common/UpDownIcon";
import Caret from "../assets/caret-down.svg";
import { FiChevronDown } from "react-icons/fi";

const breadcrumbItems = [
  { name: "AI Agent", path: "" },
  { name: "", path: "" },
];
const columns = [
  { key: "title", label: "Name", orderBy: true },
  { key: "application", label: "Current Step", orderBy: false },
  { key: "actions", label: "Project Files", orderBy: false },
  { key: "dateCreated", label: "Next Step", orderBy: false },
  { key: "prompt", label: "Details", orderBy: false },
  { key: "view", label: "", orderBy: false },
];
const AiAgentPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const itemsPerPage = 8;

  const leadsWithIds = data.map((item, index) => ({
    ...item,
    id: item.id || `lead-${index}`,
  }));

  const {
    currentPage,
    totalPages,
    paginatedData,
    paginationRange,
    handlePaginate,
    setCurrentPage,
  } = usePagination(filteredData, itemsPerPage);

  const { selectedRows, setSelectedRows, handleRowSelect, handleSelectAll } =
    useRowSelection(filteredData);

  useEffect(() => {
    setFilteredData(leadsWithIds);
    setInitialLoading(false);
  }, []);

  const [query, setQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All");

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      handleFilterAndSearch();
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, selectedStage]);

  const handleFilterAndSearch = () => {
    let filtered = leadsWithIds;

    if (selectedStage !== "All") {
      filtered = filtered.filter((row) => row.stage === selectedStage);
    }

    if (query.trim().length > 0) {
      const lowerCaseQuery = query.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(lowerCaseQuery)
        )
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handleViewAction = (rowId) => {
    console.log("View clicked for row ID:", rowId);
  };

  const handleRecommendationAction = (rowId) => {
    console.log("Recommendation clicked for row ID:", rowId);
  };

  const onAction = () => {
    console.log("Page title action clicked");
  };

  const handleSelectAllOnPage = (isChecked) => {
    const pageRowIds = paginatedData.map((row) => row.id);
    if (isChecked) {
      setSelectedRows((prevSelected) => [
        ...new Set([...prevSelected, ...pageRowIds]),
      ]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((id) => !pageRowIds.includes(id))
      );
    }
  };

  const isAllOnPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedRows.includes(row.id));
  const isAnySelectedOnPage = paginatedData.some((row) =>
    selectedRows.includes(row.id)
  );

  if (initialLoading) {
    return <div className="p-4 text-center">Loading Leads...</div>;
  }

  const handleSelectAllVisible = (isChecked) => {
    const currentIds = paginatedData.map((item) => item.id);
    if (isChecked) {
      setSelectedRows((prevSelected) => [
        ...new Set([...prevSelected, ...currentIds]),
      ]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((id) => !currentIds.includes(id))
      );
    }
  };


  return (
    <div>
      <PageTitle
        title={"AI Agent"}
        actionText="Add New AI Agent"
        ActionIcon={Plus}
        onAction={onAction}
      />

      <div>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div className="flex mt-3 gap-4">
        <div className="flex gap-0 mb-4 p-2 border border-gray-400 bg-white rounded-lg relative w-[500px]">
          <select
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-2 border-0 rounded w-[100px] text-[#6B7280] focus:outline-0 active:outline-0 focus:bg-gray-100"
          >
            <option value="All">All</option>
            <option value="DuckDuckGo">DuckDuckGo</option>
            <option value="Outlook">Outlook</option>
            <option value="Adobe Acrobat">Adobe Acrobat</option>
          </select>
          <span className="height-full w-px bg-gray-400 ml-2 mr-2"></span>

          <div className="relative pr-10 w-full">
            <input
              type="text"
              placeholder="Search by project name or phone ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 rounded-sm px-2 mr-2 w-full focus:outline-0 active:outline-0 focus:bg-gray-100"
            />
            <Search
              size="20px"
              className="absolute right-2 top-[50%] transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {loading ? (
            <RefreshCcwDot className="animate-spin text-gray-600" size={24} />
          ) : (
            ""
          )}
        </div>

        <div className="relative w-[250px] h-[40px] mb-4 border border-gray-300 bg-white  rounded-lg">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="appearance-none text-[#6B7280] w-full h-full pl-3 pr-8 rounded-lg text-sm"
          >
            <option value="All">Company</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Deal Closed">Deal Closed</option>
          </select>

          {/* Custom dropdown icon */}
          <div className="pointer-events-none absolute right-2 top-2/4 transform -translate-y-1/2">
            <FiChevronDown size={18} color="#6B7280" />
          </div>
        </div>
        
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <Th className="w-2.5 px-4">
              
                <CustomCheckbox
                  onChange={handleSelectAll}
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                />
              </Th>
              {columns.map((column) => (
                <Th key={column.key} className="text-center">
                  {/* Column Label with Icon */}
                  <div className="inline-flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.key !== "view" && <UpDownIcon />}
                  </div>
                </Th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="group bg-white hover:shadow-[0px_4px_7px_rgb(0_0_0_/_13%)] hover:z-10 transition-shadow duration-200 relative"
              >
                {/* Checkbox Column */}
                <Td className="w-2.5 px-4 group-hover:bg-brand-surface/50">
                <CustomCheckbox
                      onChange={(e) =>
                        handleRowSelect(row.id, e.target.checked)
                      }
                      checked={selectedRows.includes(row.id)}
                    />
                    
                </Td>

                {/* Other Columns */}
                {columns.map((column) => (
                  <Td
                    key={column.key}
                    className="group-hover:bg-brand-surface/50"
                  >
                    {column.key === "actions" ? (
                      <StatusBadge
                        status={row[column.key]}
                        statusType={
                          row[column.key] < 10
                            ? "positive"
                            : row[column.key] < 20
                            ? "negative"
                            : "neutral"
                        }
                      />
                    ) : column.key === "magic" ? (
                      row[column.key] ? (
                        <img src={magicIcon} alt="Magic" />
                      ) : (
                        ""
                      )
                    ) : column.key === "view" ? (
                      <TableActionButton
                        onClick={() => handleViewAction(row.id)}
                      >
                        {row.view || "View"} {/* Use data value or fallback */}
                      </TableActionButton>
                    ) : (
                      row[column.key]
                    )}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginationRange={paginationRange}
            onPaginate={handlePaginate}
          />
        )}

        {/* Per Page Display */}
        <div className="text-sm text-gray-500 pr-1 flex items-center">
          <span className="text-[14px] font-inter text-[#B1B4BA]">
            Per Page:
          </span>
          <span className="font-medium text-[#767572] flex items-center ml-2">
            {itemsPerPage}
            <img
              src={Caret}
              alt="Caret Icon"
              className="ml-1 h-[12px] w-[12px]"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AiAgentPage;

import React, { useEffect, useState } from 'react'
import PageTitle from '../components/layout/PageTitle'
import { Edit, Trash, Plus, Search, RefreshCcwDot } from "lucide-react";
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Th from '../components/common/Th';
import Td from '../components/common/Td';
import data from '../data/projectss-data.json'
import Pagination from '../components/Pagination';
import StatusBadge from '../components/StatusBadge';
import CustomCheckbox from '../components/common/CustomCheckbox';
import { usePagination } from '../hooks/usePagination';
import { useRowSelection } from '../hooks/useRowSelection';
import { RefreshCcw } from 'lucide';
import { Navigate, useNavigate } from 'react-router-dom';

const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '' },
]
const columns = [
    { key: "type", label: "Type" },
    { key: "stage", label: "Stage" },
    { key: "account", label: "Account" },
    { key: "contractValue", label: "Contract Value" },
    { key: "qaDate", label: "Q&A Date" },
    { key: "closeDate", label: "Close Date" },
    { key: "leads", label: "Leads" },
    { key: "reports", label: "Reports" },
    { key: "complaints", label: "Complaints" },
];
const statusMapping = {
    "Deal Closed": "positive",
    Negotiation: "warning",
    "Not Interested": "negative",
    Default: "neutral",
};
const ProjectsPage = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate(); // Correct usage

    const itemsPerPage = 8;

    const {
        currentPage,
        totalPages,
        paginatedData,
        paginationRange,
        handlePaginate, // Use handlePaginate from usePagination
    } = usePagination(filteredData, itemsPerPage);
    const { selectedRows, handleSelectAll, handleRowSelect } = useRowSelection(data);


    useEffect(() => {
        setFilteredData(data)
    }, [])

    const [query, setQuery] = useState("");
    const [selectedStage, setSelectedStage] = useState("All");
    useEffect(() => {
        setLoading(true); 
        const timeoutId = setTimeout(() => {
            handleFilterAndSearch();
            setLoading(false);
        }, 500); // Debounce search (wait 500ms before filtering)

        return () => clearTimeout(timeoutId); // Clear timeout on change
    }, [query, selectedStage]); // Runs whenever query or stage changes

    const handleFilterAndSearch = () => {
        let filtered = data;

        if (selectedStage !== "All") {
            filtered = filtered.filter((row) => row.leads === selectedStage);
        }

        if (query.length > 2) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((value) =>
                    value.toString().toLowerCase().includes(query.toLowerCase())
                )
            );
        }

        setFilteredData(filtered); // Updates displayed results
        console.log("changed")
    };

    const onAction = () => {
        navigate('/addProject');
    }

    return (
        <div>
            <PageTitle title={'Projects'} actionText='Add New' ActionIcon={Plus} onAction={onAction} />
            <div><Breadcrumbs items={breadcrumbItems} /></div>
            <div className='flex mt-3 gap-4'>
                <div className="flex gap-0 mb-4 p-2 border border-gray-400 bg-white rounded-lg relative ">
                    <select
                        onChange={(e) => setSelectedStage(e.target.value)}
                        className="px-2 border-0 rounded w-[100px] focus:outline-0 active:outline-0 focus:bg-gray-100"
                    >
                        <option value="All">All</option>
                        <option value="Not Interested">Not Interested</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Deal Closed">Deal Closed</option>
                    </select>
                    <span className='height-full w-px bg-gray-400 ml-2 mr-2'></span>
                    <div className='relative pr-8'>
                        <input
                            type="text"
                            placeholder="Search by project name or phone ..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="border-0 rounded-sm px-2 mr-2 w-64 focus:outline-0 active:outline-0 focus:bg-gray-100"
                        />
                        <Search size='20px' className='absolute right-4  top-[2px] text-gray-400' />
                    </div>
                    {loading ? (
    <RefreshCcwDot className="animate-spin text-gray-600" size={24} />
) :('')}
                </div>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden mt-4">
                <table className='min-w-full bg-white'>
                    <thead>
                        <tr>
                            <Th></Th>
                            <Th className='w-2.5 px-1'><CustomCheckbox onChange={handleSelectAll} checked={selectedRows.length === data.length && data.length > 0} /></Th>
                            {columns.map((column) => (
                                <Th key={column.key}>{column.label}</Th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className='group  bg-white hover:shadow-[0px_4px_7px_rgb(0_0_0_/_13%)] hover:z-10 transition-shadow duration-200 relative'>
                                <Td className='text-center group-hover:bg-brand-surface/50'>{rowIndex}</Td>
                                <Td className='w-2.5  px-0 group-hover:bg-brand-surface/50'>
                                    <CustomCheckbox onChange={() => handleRowSelect(row.id)} checked={selectedRows.includes(row.id)} />
                                </Td>

                                {columns.map((column) => (
                                    <Td key={column.key} className=' group-hover:bg-brand-surface/50'>
                                        {column.key === "leads" ? (
                                            <StatusBadge
                                                status={row[column.key]}
                                                statusType={statusMapping[row[column.key]] || "neutral"}
                                            />
                                        ) : (
                                            row[column.key]
                                        )}
                                    </Td>
                                ))}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginationRange={paginationRange}
                onPaginate={handlePaginate}
            />
        </div>
    )
}

export default ProjectsPage
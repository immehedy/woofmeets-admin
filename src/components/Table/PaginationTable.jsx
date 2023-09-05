import React, { useState, useEffect } from "react";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { BsFillPencilFill, BsFillTrashFill, BsSearch, BsFilterSquareFill, BsFillCheckSquareFill } from "react-icons/bs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {FaUnlock, FaLock} from "react-icons/fa"
import {AiFillCloseSquare, AiOutlineCheck, AiOutlineUndo} from 'react-icons/ai'
import {HiMail} from 'react-icons/hi'

import {
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import "./table.css";
import BasicPaymentVerification from "../UserSubscriptionLists/BasicPaymentVerification"

import Modal, {useModal} from "../reusable/modal"
import ConfirmationModal from "../Transactions/details/ConfirmationModal";
import { format } from "date-fns";
import GlobalNotification from "../GlobalNotification";



const PaginationTable = ({
  filteredItems,
  columns,
  data,
  loading,
  showDetails,
  showCheckbox,
  approveSitter,
  approveLoading,
  pageNumber,
  setPage,
  totalPage,
  search,
  searchByFilter,
  grid,
  basicVerification,
  setBasicVerification,
  changeVerificationPayment,
  removeItem,
  moveToEditPage,
  payment,
  payout,
  setPayout,
  toggleLock,
  setToggleLock,
  transactionId,
  setTransactionId,
  lockedReason,
  setLockedReason,
  lockedAt,
  setLockedAt,
  notificationIds,
  setNotificationIds,
}) => {

  const {openModal, isOpen, closeModal} = useModal();
  const {openModal:openRemovedModal, isOpen:isRemovedModalOpen, closeModal:closeRemovedModal} = useModal();
  const {openModal:openNotificationModal, isOpen:isNotificationOpen, closeModal:closeNotificationModal} = useModal();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const FilterActivation = localStorage.getItem("filter-activation");
  const [filter, setFilter] = useState(FilterActivation ? true : false);
  const [sendNotification, setSendNotification] = useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    setPageSize,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    hooks => {
      showCheckbox &&
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox { ...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox { ...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    },
  );

  useEffect(() => {
    if(setNotificationIds){
      setNotificationIds(selectedFlatRows.map(
        (d) => (
          {
            "id" : d?.original?.id,
            "email" : d?.original?.email,
            "name" : d?.original?.firstName + ' ' + d?.original?.lastName,
            "phone": d?.original?.contact ? d?.original?.contact : null
          }
        )
      ))
    }
  }, [selectedFlatRows]);


  useEffect(() => {
    setPageSize(20);
  }, []);

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const setPageNumber = (number) => {
    setPage(number);
    localStorage.setItem('curr-page', number);
  }

  const FilterSearchText = localStorage.getItem("filter-search-data");
  let dataFile = FilterSearchText ? JSON.parse(FilterSearchText) : {};
  const saveFilterData = (e, title) => {
    const inputValue = 
    (title === 'startDate' || title === 'endDate') ?
    format(new Date(e.target.value), "yyyy-MM-dd'T'00:00:00'Z'"):
    e.target.value;
      dataFile = {
        ...dataFile, ...{[title]: inputValue}
      }
  }

  const clearStorage = () => {
    localStorage.removeItem('filter-search-data');
    localStorage.removeItem('curr-page');
    window.location.reload();
  }

  return (
    <>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <div className="flex items-center px-1 mb-2 gap-4">
      {
        filteredItems &&
        (!filter ? 
        <BsFilterSquareFill className="text-[30px] text-orange-400 font-bold cursor-pointer" onClick={()=> {setFilter(true); localStorage.setItem("filter-activation", true);}}/>
        :
        <AiFillCloseSquare className="text-[40px] text-orange-400 font-bold cursor-pointer" onClick={()=> {setFilter(false); localStorage.setItem("filter-activation", false);}}/>
      )
      }

      {
        showCheckbox && 
        <button
          disabled={(notificationIds.length > 0 )? false : true}
          onClick={()=> {openNotificationModal(); setSendNotification(true)}}
        >
          <p className={`${notificationIds?.length > 0 ? 'cursor-pointer bg-orange-400' : 'cursor-not-allowed bg-gray-400'}  text-white font-bold px-2 py-1 rounded-sm flex gap-1 items-center`}>
            Send message <HiMail/>
          </p>
        </button>
      }
      
        <div className="flex-1">
          {basicVerification?.id && (
            <BasicPaymentVerification changeVerificationPayment={changeVerificationPayment} basicVerification={basicVerification} setBasicVerification={setBasicVerification}/>
          )}
        </div>
        <div className={`${search ? "flex items-center" : "hidden"}`}>
          <div className="border-2 border-r-0 border-gray-400 rounded-l-md p-2">
            <BsSearch />
          </div>

          <input
            type="text"
            className="p-1 outline-none active:outline-none border-2 border-l-0 border-gray-400 rounded-r-md"
            onChange={(e) => search(e.target.value)}
            placeholder="all search"
            defaultValue={localStorage.getItem("search-data") ?  localStorage.getItem("search-data")  : ''}
          />
        </div>
      </div>
      {
        filter && 
        <div className="w-full bg-gradient-to-r from-[#FFDEAD] via-[#e8ad54] to-[#ebcea3] rounded-md shadow-md px-4 py-6 my-2">
        {/* <div><h3 className="text-center text-gray-500 font-bold underline mb-2">Filter Search</h3></div> */}
        <div className={`grid grid-cols-${grid} gap-2`}>
        {filteredItems?.filter( (f) => f?.type !== 'select' )?.map((filteredItem, index) => (
          <div key={index}>
          <label className="px-1 text-gray-500 font-semibold">{filteredItem?.label}</label>
          <input 
            type={filteredItem?.type} 
            className="w-full text-gray-600 px-2 border border-gray-200 rounded-sm focus:outline-orange-400"
            defaultValue={dataFile?.[filteredItem?.name]}  
            onChange={(e) => saveFilterData(e, filteredItem?.name)}
          />
          </div>
        ))}
        {filteredItems?.filter( (f) => f?.type === 'select' )?.map((filteredItem, index) => (
          <div key={index}>
           <label className="px-1 text-gray-500 font-semibold">{filteredItem?.label}</label>
            <select 
                onChange={(e) => saveFilterData(e, filteredItem?.name)}
                id={filteredItem?.name} name={filteredItem?.name} 
                className="w-full py-1 px-2 text-gray-500 border-gray-200 rounded-sm focus:outline-orange-400">
              <>
              <option value="">choose an option</option>
              {
                filteredItem?.options?.map((option, oi) => (
                <option 
                key={oi} 
                selected={option?.value === dataFile?.[filteredItem?.name]} 
                value={option.value}
                >

                {option?.name}

                </option>
              ))
              }
              </>
            </select>
          </div>
        ))}
        </div>
        {
          filteredItems && 
          <div className="flex gap-2 justify-center items-center mt-4">
        <button className="bg-orange-400 text-white font-bold px-2 py-1 rounded-sm" onClick={() => searchByFilter(dataFile)}>search</button>
        {/* <IoMdRefresh  /> */}
        <button className="bg-gray-400 text-white font-bold px-2 py-1 rounded-sm" onClick={clearStorage}>clear filter</button>
        </div>
        }
        
        </div>
      }
      <table {...getTableProps()} className="overflow-x-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                {column.render("Header")}
                </th>
              ))}
              {(approveSitter || removeItem || payment) && <th>Option</th>}
            </tr>
          ))}
        </thead>
        {loading || approveLoading ? (
          "Loading..."
        ) : (
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="text-center">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        onClick={() =>
                          {
                            cell.column.id !== "selection" && (
                            showDetails(
                            row?.original?.email
                              ? row?.original?.email
                              : row?.original?.opk
                              ? row?.original?.opk
                              : row?.original?.id
                          )
                            )
                          }
                        }
                        className="cursor-pointer text-gray-600"
                      >
                        {cell.value || cell.column.Header === "Profile" || cell.column.id === "selection"
                          ? cell.render("Cell")
                          : "N/A"}
                      </td>
                    );
                  })}
                  {approveSitter && (
                    <td>
                      <button
                        className={`${
                          row?.original?.isApproved
                            ? "bg-gray-200 text-gray-600"
                            : "bg-green-400 text-white"
                        } px-2 py-1 rounded-md w-full`}
                        onClick={() => approveSitter(row?.original?.email)}
                      >
                        {row?.original?.isApproved ? <p className="flex gap-1 items-center"><AiOutlineUndo/> Undo</p> : <p className="flex gap-1 items-center"><AiOutlineCheck/> Approve</p>}
                      </button>
                    </td>
                  )}
                  {removeItem && (
                    <td>
                    <div className="flex gap-2 justify-center items-center">
                    <button onClick={() => moveToEditPage(row?.original?.code ? row?.original?.code : row?.original?.id)} className="bg-blue-400 text-white p-2 rounded-md"><BsFillPencilFill/></button>
                      <button onClick={() => {openRemovedModal(); setDeleteItemId(row?.original?.id)}} className="bg-red-400 text-white p-2 rounded-md"><BsFillTrashFill/></button>
                    </div>
                    <Modal
                    isOpen={isRemovedModalOpen}
                    onClose={closeRemovedModal}
                    showCloseButton
                    title={"Delete Item"}
                    >
                      <div>
                    <p className="mb-4">Are you sure you want to delete this item?</p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={()=>{
                          removeItem(deleteItemId); 
                          closeRemovedModal();
                          }}
                        className="bg-[#FFA557] text-white px-5 py-1 rounded-md"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={closeRemovedModal}
                        className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                      </div>
                     </div>
                    </Modal>
                    </td>
                  )}
                  {payment && (
                    <td>
                    {
                      (row?.original?.state === 'CUSTOMER_PAID' || row?.original?.state === 'PARTIAL_REFUND') &&
                      <div className="flex items-center gap-2">
                    <button
                      className={`${
                        row?.original?.lockedAt ? "text-green-400" : "text-red-400"
                      } bg-gray-200 rounded-md p-2`}
                      onClick={() => {
                        openModal();
                        setToggleLock(!toggleLock);
                        setTransactionId(row?.original?.id);
                        setLockedReason(row?.original?.lockedReason);
                        setLockedAt(row?.original?.lockedAt);
                      }}
                    >
                      {row?.original?.lockedAt ? <FaUnlock id={row?.original?.id}/> : <FaLock id={row?.original?.id}/>}
                    </button>
                    <ReactTooltip
                      anchorId={row?.original?.id}
                      place="top"
                      content={row?.original?.lockedAt ? 'Unlock this transaction' : 'Lock this transaction'}
                    />
                    <button
                      disabled={row?.original?.lockedAt ? true : false}
                      onClick={() => {
                        openModal();
                        setPayout(!payout);
                        setTransactionId(row?.original?.id);
                        setLockedReason(row?.original?.lockedReason ? row?.original?.lockedReason : " ");
                      }}
                      className={`${
                        row?.original?.lockedAt
                          ? "text-gray-600 bg-gray-200"
                          : "text-green-400 bg-gray-200"
                      } rounded-md p-2 text-[14px] font-bold ${
                        row?.original?.lockedAt ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >Pay out</button>
                      </div>
                    }
                    {
                      row?.original?.state === 'PAID_OUT' &&
                      <span className="font-semibold text-gray-600">PAID</span>
                    }
                    {
                      row?.original?.state === 'FULL_REFUND' &&
                      <span className="font-semibold text-red-400">Fully Refunded</span>
                    }
                    </td>
                    
                  )}
                </tr>
              );
            })}
            {
              page?.length === 0 &&
              <tr>
                <td colSpan={columns?.length + ((approveSitter || removeItem || payment) ? 1 : 0) } className="text-orange-400 text-center font-bold">No data found !!!</td>
              </tr>
            }
          </tbody>
        )}
      </table>
      <ConfirmationModal
        id={transactionId}
        isOpen={isOpen}
        closeModal={closeModal}
        toggleLock={toggleLock}
        setToggleLock={setToggleLock}
        payout={payout}
        setPayout={setPayout}
        lockedReason={lockedReason}
        lockedAt={lockedAt}
       />
        <GlobalNotification
        isOpen={isNotificationOpen}
        closeModal={closeNotificationModal}
        users={notificationIds}
        setSendNotification={setSendNotification}
        />
      <div className="md:flex md:justify-end gap-2 py-2">
        <button
          onClick={() => {
            setPageNumber(1);
          }}
          disabled={pageNumber === 1}
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => {
            if (pageNumber > 0) {
              setPageNumber(pageNumber - 1);
            }
          }}
          disabled={pageNumber === 1}
        >
          Previous
        </button>{" "}
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
          disabled={pageNumber === totalPage}
        >
          Next
        </button>{" "}
        <button
          onClick={() => {
            setPageNumber(totalPage);
          }}
          disabled={pageNumber === totalPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageNumber} of {totalPage}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            min="1"
            defaultValue={pageNumber}
            onKeyPress={preventMinus}
            className="border-2 rounded-md"
            onChange={(e) => {
              const inputPageNumber = e.target.value
                ? Math.abs(Number(e.target.value))
                : 1;
              setPageNumber(inputPageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        {/* <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="outline-none"
          >
          {[10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize} classNam="py-2">
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </>
  );
};

export default PaginationTable;

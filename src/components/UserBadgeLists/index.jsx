import { useState, useEffect } from "react";
import {COLUMNS} from "./lib/utils/column";
import PaginationTable from "../Table/PaginationTable"
import getBadgeLists, { searchBadge } from "./lib/hooks/useBadgeList";
import { useNavigate } from "react-router-dom";
import { deleteBadge } from "./lib/hooks/useCreateBadge";


const UserBadgeListsPage = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentPage = localStorage.getItem("curr-page");
  const [pageNumber, setPage] = useState(currentPage ? currentPage : 1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const getCoponLists = () => {
    setLoading(true);
    getBadgeLists(pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          console.log({data});
          return {
            id: data?.id,
            title: data?.title,
            description: data?.description,
            priority: data?.priority,
            icon: data?.icon?.Location,
            image: data?.image?.Location
          };
        });
        setLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {console.log(err); setPage(1);setLoading(false); setLists([])});
  }
  useEffect(() => {
    getCoponLists();
  }, [pageNumber]);

  const moveToCreateBadge = () => {
    navigate("/user-badge-create");
  }
  const moveToEditBadge = (id) => {
    navigate(`/user-badge-edit/badge?id=${id}`);
  }
  const badgeRemove = (id) => {
    deleteBadge(id)
        .then((res) => {
          getCoponLists();
        }).
        catch((err) => {
          console.log({err})
        })
  }

  const search = (searchString) => {
    searchBadge(searchString, pageNumber, 20)
    .then((res) => {
      const modify = res?.data.map((data, index) => {
        return {
          id: data?.id,
          code: data?.code,
          percentage: data?.percentage,
          expireDate: data?.expiresAt,
          badgeType: data?.isPublic ? 'Public' : 'Private',
        };
      });
      setLists(modify);
      setLoading(false);
      setTotalPage(Math.ceil(res?.meta?.total / 20));
    })
    .catch((err) => {console.log(err); setPage(1);setLoading(false); setLists([])});
  }

  return (
        <div>
        <div className="flex justify-center">
          <button className="text-center rounded-md bg-orange-400 text-white px-4 py-2" onClick={moveToCreateBadge}>Add Badge</button>
        </div>
        <PaginationTable columns={COLUMNS} data={lists} pageNumber={pageNumber} setPage={setPage} totalPage={totalPage} loading={loading} search={search} removeItem={badgeRemove} moveToEditPage={moveToEditBadge}/>
        </div>
  );
};

export default UserBadgeListsPage;

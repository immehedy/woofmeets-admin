import { useEffect, useState } from "react";
import { getBadges, getProviderBadges } from "../lib/hooks/getBadges";
import { useModal } from "../../../reusable/modal";
import { addSittersBadge, replaceBadge } from "../lib/hooks/postBadge";
import { Tooltip } from "react-tooltip";
import { GrEdit, GrTrash } from "react-icons/gr";
import { deleteBadge } from "../lib/hooks/deleteBadge";
import cogoToast from "cogo-toast";
import BadgeModal from "./BadgeModal";

const BadgeSetter = ({ user }) => {
  const [addBadges, setAddbadges] = useState();
  const [providerBadges, setProviderbadges] = useState();
  const [loading, setLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: removeIsOpen,
    openModal: removeOpenModal,
    closeModal: removeCloseModal,
  } = useModal();
  const {
    isOpen: editIsOpen,
    openModal: editOpenModal,
    closeModal: editCloseModal,
  } = useModal();
  const [dataFile, setDataFile] = useState({
    providerId: user?.id,
  });
  const [badgeId, setBadgeId] = useState();

  useEffect(() => {
    setLoading(true);
    getBadges()
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            id: data?.id,
            title: data?.title,
            description: data?.description,
            priority: data?.priority,
            icon: data?.icon?.Location,
            image: data?.image?.Location,
          };
        });

        setAddbadges(modify);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    getProviderBadges(user?.id)
      .then((res) => {
        setProviderbadges(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const submitBadge = () => {
    setLoading(true);
    closeModal();
    addSittersBadge(dataFile)
      .then((res) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  };

  const removeBadge = () => {
    deleteBadge(badgeId)
      .then((res) => {
        setLoading(false);
        removeCloseModal();
        window.location.reload();
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
        removeCloseModal();
      });
  };

  const editBadge = () => {
    setLoading(true);
    replaceBadge(badgeId, dataFile?.badgeId)
      .then((res) => {
        setLoading(false);
        editCloseModal();
        window.location.reload();
      })
      .catch((err) => {
        console.log({ err });
        cogoToast.error(err?.data?.messages?.badgeId);
        setLoading(false);
        editCloseModal();
      });
  };

  return (
    <div className="w-full">
      <label className="mb-1 flex flex-wrap gap-1 items-center">
        Badge -{" "}
        {providerBadges?.length > 0 ? (
          providerBadges?.map((item, i) => (
            <div className="group relative px-1 py-2">
              <img
                key={i}
                src={item?.badge?.icon?.Location}
                alt="badge-icon"
                className=" w-[30px] h-auto"
                id={i}
              />
              <div className="absolute hidden top-[-7px] right-[-5px] group-hover:inline-block space-y-4 text-[14px]">
                <GrEdit
                  className="hover:text-[18px] cursor-pointer"
                  onClick={() => {
                    editOpenModal();
                    setBadgeId(item?.id);
                  }}
                />
                <GrTrash
                  className="hover:text-[18px] cursor-pointer"
                  onClick={() => {
                    removeOpenModal();
                    setBadgeId(item?.id);
                  }}
                />
              </div>
              <Tooltip
                anchorId={i}
                style={{
                  backgroundColor: "##FFA500",
                  color: "white",
                  font: "bold",
                  width: "200px",
                }}>
                <p>{item?.badge?.title}</p>
                <p>{item?.badge?.description}</p>
              </Tooltip>
            </div>
          ))
        ) : (
          <span className="bg-red-400 text-white text-center font-semibold text-[10px] border border-red-400 px-2 py-1 mb-1 rounded-md">
            No Badge found !!!
          </span>
        )}
      </label>
      <select
        onChange={(e) => {
          setDataFile({ ...dataFile, ...{ badgeId: e.target.value } });
          openModal();
        }}
        className="w-full py-1 px-2 text-gray-500 border-2 border-gray-200 rounded-md focus:outline-orange-400">
        <>
          <option disabled selected value="">
            Set Badge
          </option>
          {addBadges?.map((option, oi) => (
            <option
              disabled={providerBadges?.find(
                (item) => item?.badgeId === option?.id
              )}
              key={oi}
              value={option.id}>
              {option?.title}
            </option>
          ))}
        </>
      </select>
      <BadgeModal
        isOpen={isOpen}
        closeModal={closeModal}
        submitBadge={submitBadge}
        loading={loading}
        removeIsOpen={removeIsOpen}
        removeCloseModal={removeCloseModal}
        removeBadge={removeBadge}
        editIsOpen={editIsOpen}
        editCloseModal={editCloseModal}
        setDataFile={setDataFile}
        addBadges={addBadges}
        providerBadges={providerBadges}
        editBadge={editBadge}
      />
    </div>
  );
};

export default BadgeSetter;

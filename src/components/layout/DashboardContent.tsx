import { useEffect, useState } from "react";
import { Calendar, MapPin, User, Loader2, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  capitalizeWords,
  formatDate,
  getStatusColor,
} from "../../utils/helper";
import DealCard from "../ui/DealCard";
import { LoaderUi } from "../../utils/HelperStructure";

const DashboardContent = () => {
  const [dealsData, setDealsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDeal, setSelectedDeal] = useState(null);

  const urlMainTab = searchParams.get("tab") || "express_bookings";
  const urlSubTab = searchParams.get("subTab");

  const [activeMainTab, setActiveMainTab] = useState(urlMainTab);
  const [activeSubTab, setActiveSubTab] = useState({});

  useEffect(() => {
    setActiveMainTab(urlMainTab);

    if (urlSubTab) {
      setActiveSubTab((prev) => ({
        ...prev,
        [urlMainTab]: urlSubTab,
      }));
    }
  }, [urlMainTab, urlSubTab]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axiosInstance.get(
          "https://buyer-dash.starclinch.com/deals/fetch-deals/",
        );

        if (res?.data?.success) {
          setDealsData(res.data.deals);
          const defaultSubTabs = {};
          Object.keys(res.data.deals).forEach((key) => {
            const subKeys = Object.keys(res.data.deals[key]);
            if (subKeys.length > 0) {
              defaultSubTabs[key] = subKeys[0];
            }
          });
          setActiveSubTab(defaultSubTabs);
        }
        setLoading(false);
      } catch (error) {
        console.error("Deal fetch failed", error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleMainTabChange = (tab) => {
    setActiveMainTab(tab);

    setSearchParams({
      tab,
      ...(activeSubTab[tab] ? { subTab: activeSubTab[tab] } : {}),
    });
  };

  const handleSubTabChange = (subTab) => {
    setActiveSubTab((prev) => ({
      ...prev,
      [activeMainTab]: subTab,
    }));

    setSearchParams({
      tab: activeMainTab,
      subTab,
    });
  };

  const DealModal = ({ deal, onClose }) => {
    if (!deal) return null;

    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold text-white">Deal Details</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {deal.title}
              </h3>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                  deal.status,
                )}`}
              >
                {capitalizeWords(deal.status)}
              </span>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="text-sm text-slate-400 mb-1">Deal Value</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {deal.formatted_value}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deal.person_name && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">
                        Contact Person
                      </div>
                      <div className="font-medium text-white">
                        {deal.person_name}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {deal.artist && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-lg">🎭</span>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Artist</div>
                      <div className="font-medium text-white">
                        {deal.artist}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {deal.event_date && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Event Date</div>
                      <div className="font-medium text-white">
                        {formatDate(deal.event_date)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {deal.location && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Location</div>
                      <div className="font-medium text-white">
                        {deal.location}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700 pt-4 flex justify-between items-center text-sm text-slate-400">
              <div>
                Deal ID:{" "}
                <span className="font-medium text-slate-300">
                  {deal.deal_id}
                </span>
              </div>
              <div>
                Last Updated:{" "}
                <span className="font-medium text-slate-300">
                  {formatDate(deal.update_time)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getCountForTab = (mainKey, subKey = null) => {
    if (!dealsData) return 0;

    if (Array.isArray(dealsData[mainKey])) {
      return dealsData[mainKey].length;
    }

    if (subKey && dealsData[mainKey] && dealsData[mainKey][subKey]) {
      return dealsData[mainKey][subKey].length;
    }

    if (dealsData[mainKey] && typeof dealsData[mainKey] === "object") {
      return Object.values(dealsData[mainKey]).reduce((sum, arr) => {
        return sum + (Array.isArray(arr) ? arr.length : 0);
      }, 0);
    }

    return 0;
  };

  if (loading) {
    return <LoaderUi />;
  }

  if (!dealsData) {
    return (
      <div className="text-center text-gray-600 py-12">
        Failed to load data. Please try again.
      </div>
    );
  }

  const mainTabs = Object.keys(dealsData);
  const currentMainData = dealsData[activeMainTab];
  const isArray = Array.isArray(currentMainData);
  const subTabs = isArray ? [] : Object.keys(currentMainData || {});
  const currentSubTab = activeSubTab[activeMainTab];
  const currentData = isArray
    ? currentMainData
    : currentMainData?.[currentSubTab] || [];

  return (
    <div className="p-1 md:p-6 space-y-6 max-w-[1600px] mx-auto min-h-screen">
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/70 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mainTabs.map((tab) => {
            const count = getCountForTab(tab);
            return (
              <button
                key={tab}
                onClick={() => handleMainTabChange(tab)}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                  activeMainTab === tab
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {capitalizeWords(tab)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {!isArray && subTabs.length > 0 && (
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/70 shadow-xl">
          <div
            className={`grid gap-3 ${
              subTabs.length === 2
                ? "grid-cols-2"
                : subTabs.length === 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : "grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {subTabs.map((subTab) => {
              const count = getCountForTab(activeMainTab, subTab);
              return (
                <button
                  key={subTab}
                  onClick={() => handleSubTabChange(subTab)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                    currentSubTab === subTab
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  {capitalizeWords(subTab)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="pb-6">
        {currentData.length === 0 ? (
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-16 border border-slate-700/70 text-center shadow-xl">
            <div className="text-slate-400 text-lg font-medium">
              No {activeMainTab.replace(/_/g, " ")} found
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentData.map((deal) => (
              <DealCard
                key={deal.deal_id}
                deal={deal}
                setSelectedDeal={setSelectedDeal}
              />
            ))}
          </div>
        )}
      </div>

      {selectedDeal && (
        <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  );
};

export default DashboardContent;

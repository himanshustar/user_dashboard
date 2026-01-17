import { useState, useEffect } from "react";

import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";
import {
  ActivityTabs,
  ContactCards,
  EventDetails,
  LoaderUi,
  ProgressSteps,
} from "../utils/HelperStructure";
import { useRazorpay } from "../hooks/useRazorpay";
import PayButton from "../components/ui/PayButton";

// Artist Card Component
const ArtistCard = ({
  artist,
  onAction,
  actionLabel,
  actionColor = "orange",
}) => {
  const colorClasses = {
    orange: "bg-gradient-to-br from-orange-600 to-orange-500",
    blue: "bg-gradient-to-br from-blue-600 to-blue-500",
    green: "bg-gradient-to-br from-green-600 to-green-500",
  };

  return (
    <div
      className={`${colorClasses[actionColor]} rounded-xl p-4 sm:p-6 shadow-lg`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 rounded-full mx-auto sm:mx-0" />

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-white font-bold text-base sm:text-lg">
            Artist: {artist.name}
          </h3>
          <p className="text-white/80 text-xs sm:text-sm uppercase tracking-wide">
            {artist.type}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onAction}
          className="
            w-full sm:w-auto
            px-4 sm:px-6
            py-2
            bg-white text-slate-900
            font-semibold
            rounded-lg
            hover:bg-slate-100
            transition-colors
            cursor-pointer
          "
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

// Tab Content Components
const PreferredTab = () => (
  <div className="py-4 md:py-8">
    <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 flex-wrap text-center">
      <span className="text-xl md:text-2xl">☀️</span>
      <h3 className="text-lg md:text-2xl font-bold text-yellow-400">
        This Artist has been Chosen by You
      </h3>
      <span className="text-xl md:text-2xl">☀️</span>
    </div>
    <ArtistCard
      artist={{ name: "testcockpit", type: "INFLUENCER" }}
      actionLabel="View Profile"
      actionColor="orange"
    />
  </div>
);

const ShortlistTab = () => (
  <div className="py-4 md:py-8">
    <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 flex-wrap text-center px-4">
      <span className="text-xl md:text-2xl">☀️</span>
      <h3 className="text-lg md:text-2xl font-bold text-yellow-400">
        Suggested Artists Aligned with Your Budget
      </h3>
      <span className="text-xl md:text-2xl">☀️</span>
    </div>
    <div className="text-center">
      <button className="px-6 md:px-8 py-2.5 md:py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-full font-medium transition-colors text-sm md:text-base">
        Shortlist Now
      </button>
    </div>
  </div>
);

const ShortlistedTab = () => (
  <div className="py-4 md:py-8">
    <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 flex-wrap text-center px-4">
      <span className="text-xl md:text-2xl">☀️</span>
      <h3 className="text-lg md:text-2xl font-bold text-yellow-400">
        These Artists are Shortlisted by You
      </h3>
      <span className="text-xl md:text-2xl">☀️</span>
    </div>
    <div className="text-center text-slate-400 text-sm md:text-base">
      No artists shortlisted yet
    </div>
  </div>
);

const ConfirmPayTab = ({ count = 1 }) => (
  <div className="py-4 md:py-8">
    <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 flex-wrap text-center px-4">
      <span className="text-xl md:text-2xl">☀️</span>
      <h3 className="text-lg md:text-2xl font-bold text-yellow-400">
        These Artists have Confirmed their Availability for Your Event
      </h3>
      <span className="text-xl md:text-2xl">☀️</span>
    </div>
    <div className="max-w-md mx-auto  md:px-4">
      <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-slate-600/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-16 h-16 bg-slate-600 rounded flex-shrink-0 mx-auto sm:mx-0"></div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-base md:text-lg font-bold text-white mb-1">
              None
            </h4>
            <p className="text-xs md:text-sm text-slate-300 mb-1">
              Category: None
            </p>
            <p className="text-xs md:text-sm text-slate-300 mb-3">
              Fee: ₹20,000
            </p>
            <button className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors text-sm">
              View Profile
            </button>
          </div>
          <div>
            {/* <button className="w-full sm:w-auto cursor-pointer px-4 md:px-6 py-2.5 md:py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base shadow-lg shadow-blue-500/30">
              Book Now
            </button> */}
            <PayButton amount={499} currency="INR" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BookingFlowPage = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [activeTab, setActiveTab] = useState("preferred");
  const [dealData, setDealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dealId } = useParams();
  const { pay } = useRazorpay();

  useEffect(() => {
    const fetchDealData = async () => {
      try {
        const res = await axiosInstance.get(
          `/deals/deal-notification/${dealId}/`,
        );

        setDealData(res?.data?.deal);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch deal data", error);
        setLoading(false);
      }
    };

    fetchDealData();
  }, []);

  if (loading) {
    return <LoaderUi />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <ProgressSteps currentStep={currentStep} />

      {/* Event Details */}
      {dealData && <EventDetails deal={dealData} />}

      {/* Activity Tabs */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
        <ActivityTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          confirmPayCount={1}
        />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "preferred" && <PreferredTab />}
          {activeTab === "shortlist" && <ShortlistTab />}
          {activeTab === "shortlisted" && <ShortlistedTab />}
          {activeTab === "confirm" && <ConfirmPayTab count={1} />}
        </div>
      </div>

      {/* Contact Cards */}
      <ContactCards />
    </div>
  );
};

export default BookingFlowPage;

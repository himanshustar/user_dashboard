import {
  Calendar,
  Check,
  Clock,
  Loader2,
  MapPin,
  Music,
  Users,
  Wallet,
} from "lucide-react";
import { formatDate } from "./helper";
import React from "react";

export const LoaderUi = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
};

export const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.15 0 5.79 1.08 7.95 3.06l5.9-5.9C34.11 3.1 29.45 1 24 1 14.61 1 6.57 6.38 2.69 14.14l6.98 5.43C11.5 13.24 17.23 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24c0-1.64-.15-3.21-.43-4.71H24v9.42h12.7c-.55 2.97-2.23 5.49-4.74 7.18l7.33 5.69C43.78 37.2 46.5 31.01 46.5 24z"
    />
    <path
      fill="#FBBC05"
      d="M9.67 28.57a14.5 14.5 0 010-9.14l-6.98-5.43A23.96 23.96 0 000 24c0 3.94.95 7.66 2.69 10.99l6.98-5.42z"
    />
    <path
      fill="#34A853"
      d="M24 47c6.45 0 11.86-2.13 15.81-5.79l-7.33-5.69c-2.04 1.37-4.66 2.18-8.48 2.18-6.77 0-12.5-3.74-14.33-8.99l-6.98 5.42C6.57 41.62 14.61 47 24 47z"
    />
  </svg>
);

export const TruecallerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="#1A73E8" />
    <path
      fill="#fff"
      d="M33.6 30.4l-4.4-1.9c-.6-.3-1.3-.1-1.7.4l-2 2.4c-3.3-1.7-6-4.4-7.7-7.7l2.4-2c.5-.4.6-1.1.4-1.7l-1.9-4.4c-.3-.7-1.1-1.1-1.8-.9l-3.8.9c-.7.2-1.2.8-1.2 1.5 0 10.5 8.5 19 19 19 .7 0 1.3-.5 1.5-1.2l.9-3.8c.2-.7-.2-1.5-.9-1.8z"
    />
  </svg>
);

export const EventDetails = ({ deal }) => {
  const details = [
    {
      label: "Venue",
      value: deal.location,
      icon: MapPin,
      iconColor: "text-red-400",
    },
    {
      label: "Date",
      value: formatDate(deal.event_date),
      icon: Calendar,
      iconColor: "text-blue-400",
    },
    {
      label: "Gathering Size",
      value: "123 people",
      icon: Users,
      iconColor: "text-green-400",
    },
    {
      label: "Duration",
      value: "90 mins",
      icon: Clock,
      iconColor: "text-yellow-400",
    },
    {
      label: "Event Type",
      value: "Concert/Festival",
      icon: Music,
      iconColor: "text-purple-400",
    },
    {
      label: "Budget",
      value: deal.formatted_value,
      icon: Wallet,
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-slate-700/50 mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-red-400 mb-4 md:mb-6">
        Event Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {details.map(({ label, value, icon: Icon, iconColor }, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-slate-900 p-3 rounded-lg"
          >
            <Icon className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
            <div className="min-w-0">
              <p className="text-slate-400 text-xs md:text-sm mb-0.5">
                {label}:
              </p>
              <p className="text-white font-medium text-sm md:text-base truncate">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StepButton = ({ stepNumber, label, isCompleted, isActive }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
          isCompleted
            ? "bg-green-500 text-white"
            : isActive
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-400"
        }`}
      >
        {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
      </div>
      <span
        className={`mt-2 text-xs font-medium ${
          isActive ? "text-white" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Initiated" },
    { number: 2, label: "In Progress" },
    { number: 3, label: "Book Now" },
    { number: 4, label: "Billing Info" },
    { number: 5, label: "Booked" },
    { number: 6, label: "Success" },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-slate-700/50 mb-6">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <StepButton
              stepNumber={step.number}
              label={step.label}
              isCompleted={currentStep > step.number}
              isActive={currentStep === step.number}
            />
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 mb-4 rounded ${
                  currentStep > step.number ? "bg-green-500" : "bg-slate-700"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* Current Step Display */}
        <div className="text-center mb-4">
          <div className="text-slate-400 text-sm mb-2">
            Step {currentStep} of {steps.length}
          </div>
          <div className="flex items-center justify-center gap-1 mb-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step.number < currentStep
                    ? "bg-green-500"
                    : step.number === currentStep
                      ? "bg-blue-500"
                      : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Step Info */}
        <div className="flex items-center justify-center">
          <StepButton
            stepNumber={currentStep}
            label={steps[currentStep - 1].label}
            isCompleted={false}
            isActive={true}
          />
        </div>

        {/* Previous and Next Steps */}
        <div className="flex justify-between items-center mt-4 text-xs">
          {currentStep > 1 && (
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-500" />
              </div>
              <span>{steps[currentStep - 2].label}</span>
            </div>
          )}
          {currentStep < steps.length && (
            <div className="flex items-center gap-2 text-slate-400 ml-auto">
              <span>{steps[currentStep].label}</span>
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 text-xs">
                {currentStep + 1}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ActivityTabs = ({ activeTab, setActiveTab, confirmPayCount }) => {
  const tabs = [
    { id: "preferred", label: "Preferred" },
    { id: "shortlist", label: "Shortlist" },
    { id: "shortlisted", label: "Shortlisted" },
    { id: "confirm", label: "Confirm & Pay", count: confirmPayCount },
  ];

  return (
    <div className="mb-4 md:mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-4 md:mb-6">
        Activity
      </h2>

      <div className="flex gap-2 md:gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 md:px-6 py-2 cursor-pointer rounded-lg font-medium transition-all duration-200 relative text-sm md:text-base ${
              activeTab === tab.id
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-slate-700/50 text-slate-200 hover:bg-slate-700 hover:scale-105 active:bg-slate-700"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="absolute -top-1.5 md:-top-2 -right-1.5 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ContactCards = () => {
  const contacts = [
    {
      title: "If you need any assistance:",
      role: "Executive - Client Relations",
      name: "Tanishka",
      email: "tanishka@starclinch.com",
    },
    {
      title: "If you feel the need to escalate:",
      role: "Manager - Client Relations",
      name: "Abhishek Sengupta",
      email: "abhishek@starclinch.com",
      phone: "+919599221032",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
        >
          <h4 className="font-semibold text-white mb-4">{contact.title}</h4>

          <p className="text-slate-300 mb-2">{contact.role}</p>

          <p className="text-slate-100 font-medium mb-1">
            Name: {contact.name}
          </p>

          <p className="text-slate-300 mb-1">
            Email:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-400 hover:underline"
            >
              {contact.email}
            </a>
          </p>

          {contact.phone && (
            <p className="text-slate-300">
              Mobile:{" "}
              <a
                href={`tel:${contact.phone}`}
                className="text-blue-400 hover:underline"
              >
                {contact.phone}
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

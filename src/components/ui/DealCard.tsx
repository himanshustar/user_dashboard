import { Calendar, MapPin, User } from "lucide-react";
import {
  capitalizeWords,
  formatDate,
  getStatusColor,
} from "../../utils/helper";

const DealCard = ({ deal, setSelectedDeal }) => (
  <div
    onClick={() => setSelectedDeal(deal)}
    className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1 pr-2">
        {deal.title}
      </h3>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
          deal.status,
        )}`}
      >
        {capitalizeWords(deal.status)}
      </span>
    </div>

    <div className="space-y-3 mb-4">
      {deal.artist && (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-sm">🎭</span>
          </div>
          <span className="text-sm text-slate-300 truncate">{deal.artist}</span>
        </div>
      )}

      {deal.person_name && (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm text-slate-300 truncate">
            {deal.person_name}
          </span>
        </div>
      )}

      {deal.event_date && (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
            <Calendar size={14} className="text-white" />
          </div>
          <span className="text-sm text-slate-300">
            {formatDate(deal.event_date)}
          </span>
        </div>
      )}

      {deal.location && (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <MapPin size={14} className="text-white" />
          </div>
          <span className="text-sm text-slate-300 truncate">
            {deal.location}
          </span>
        </div>
      )}
    </div>

    <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
      <div className="text-xs text-slate-400">
        ID: <span className="text-slate-300">{deal.deal_id}</span>
      </div>
      <div className="text-lg font-bold text-blue-400">
        {deal.formatted_value}
      </div>
    </div>
  </div>
);

export default DealCard;

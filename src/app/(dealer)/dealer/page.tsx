import { connectDB } from "@/lib/mongodb";
import { Dealers } from "@/models/Dealer/dealer";
import AgentCard from "@/components/(dealer)/AgentCard";

export default async function AgentsPage() {
  await connectDB();

  const dealers = await Dealers.find({}).lean();

  const safeDealers = JSON.parse(JSON.stringify(dealers));

  return (
    <main className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16 flex flex-col items-center">
        <span className="px-4 py-1.5 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-100">
          Agents
        </span>

        <h1 className="text-4xl md:text-6xl font-medium text-gray-900 tracking-tight leading-[1.1] max-w-3xl">
          Meet our exceptional agents for a{" "}
          <span className="text-blue-600">seamless</span> experience
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {safeDealers.map((dealer: any) => (
          <AgentCard
            key={dealer._id}
            agent={dealer}
          />
        ))}
      </div>
    </main>
  );
}
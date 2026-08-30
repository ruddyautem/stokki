export default function HeroDashboardSkeleton() {
  return (
    <div className="w-full h-full flex-1 min-h-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-slate-200/40 flex flex-col overflow-hidden">
      {/* 
        Inner Container: 
        Simulates the actual application window or browser viewport 
      */}
      <div className="w-full h-full rounded-lg border border-slate-100 bg-slate-50 flex flex-col overflow-hidden">
        {/* 
          Mock Browser Header: 
          Contains the 3 macOS-style window controls (red/yellow/green dots) 
          and a fake URL bar 
        */}
        <div className="h-10 xl:h-12 border-b border-slate-200 bg-white flex items-center px-4 xl:px-6 gap-3 xl:gap-4 shrink-0">
          <div className="flex gap-1.5 xl:gap-2">
            <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-slate-300" />
            <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-slate-300" />
            <div className="w-3 h-3 xl:w-3.5 xl:h-3.5 rounded-full bg-slate-300" />
          </div>
          <div className="h-4 xl:h-5 w-28 xl:w-40 bg-slate-100 rounded-md" />
        </div>

        {/* 
          Application Body: 
          A standard 2-column layout with a sidebar on the left and main content on the right. 
        */}
        <div className="flex-1 flex overflow-hidden">
          {/* 
            Sidebar (Hidden on mobile, visible on tablet and up): 
            Contains logo, navigation items, and user profile block at the bottom.
          */}
          <div className="hidden md:flex flex-col w-56 xl:w-72 border-r border-slate-200 bg-white pt-4 pb-4 px-3 xl:px-5 shrink-0">
            {/* Mock Logo */}
            <div className="flex items-center gap-2 px-2 mb-6 xl:mb-10 shrink-0">
              <div className="w-5 h-5 xl:w-7 xl:h-7 rounded bg-slate-200" />
              <div className="w-16 xl:w-24 h-4 xl:h-5 rounded bg-slate-200" />
            </div>

            {/* Navigation Menu Items */}
            <div className="flex flex-col gap-1.5 xl:gap-2 overflow-y-auto min-h-0">
              <div className="h-2 xl:h-2.5 w-8 xl:w-12 bg-slate-200 rounded-full mb-2 xl:mb-3 ml-2 shrink-0" />
              <div className="h-10 xl:h-12 w-full bg-slate-100 rounded-md flex items-center px-2.5 xl:px-4 gap-2 xl:gap-3 shrink-0">
                <div className="w-4 h-4 xl:w-5 xl:h-5 rounded bg-slate-300 shrink-0" />
                <div className="w-20 xl:w-32 h-2.5 xl:h-3 rounded bg-slate-400 shrink-0" />
              </div>
              <div className="h-10 xl:h-12 w-full rounded-md flex items-center px-2.5 xl:px-4 gap-2 xl:gap-3 shrink-0">
                <div className="w-4 h-4 xl:w-5 xl:h-5 rounded bg-slate-200 shrink-0" />
                <div className="w-16 xl:w-24 h-2.5 xl:h-3 rounded bg-slate-300 shrink-0" />
              </div>
              <div className="h-10 xl:h-12 w-full rounded-md flex items-center px-2.5 xl:px-4 gap-2 xl:gap-3 shrink-0">
                <div className="w-4 h-4 xl:w-5 xl:h-5 rounded bg-slate-200 shrink-0" />
                <div className="w-24 xl:w-40 h-2.5 xl:h-3 rounded bg-slate-300 shrink-0" />
              </div>
            </div>

            {/* Bottom User Profile Section */}
            <div className="mt-auto flex items-center gap-2 xl:gap-3 px-2 pt-4 xl:pt-6 border-t border-slate-100 shrink-0">
              <div className="h-6 w-6 xl:h-8 xl:w-8 rounded-full bg-slate-200 shrink-0" />
              <div className="h-2 xl:h-3 w-16 xl:w-24 rounded bg-slate-300 shrink-0" />
            </div>
          </div>

          {/* 
            Main Content Area: 
            Scrollable right-hand side that contains the dashboard page.
          */}
          <div className="flex-1 flex flex-col p-5 xl:p-8 gap-5 xl:gap-8 bg-[#f8fafc] overflow-y-auto overflow-x-hidden relative">
            {/* Mobile Hamburger Menu (Only visible on small screens) */}
            <div className="md:hidden absolute top-4 left-4 w-8 h-8 rounded-md bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-1 z-10">
              <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
              <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
              <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
            </div>

            {/* Page Header (Title & Subtitle) */}
            <div className="flex flex-col items-center gap-1.5 xl:gap-2.5 shrink-0 mt-3 md:mt-0">
              <div className="h-6 xl:h-8 w-40 xl:w-56 bg-slate-400 rounded-md" />
              <div className="h-3 xl:h-4 w-64 xl:w-96 bg-slate-300 rounded-md" />
            </div>

            {/* 
              Stats Cards Grid: 
              Displays 4 metric cards. 
              Responsive behavior: 
              - 2 columns on mobile (showing 1st, 2nd, and 4th card, 3rd is hidden)
              - 3 columns on tablet (md) (showing 1st, 2nd, 3rd, 4th is hidden)
              - 4 columns on desktop (xl) (showing all 4 cards)
            */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6 shrink-0 mt-2 xl:mt-4">
              {/* Card 1: Total Products */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col gap-3 xl:gap-5">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-slate-100 shrink-0" />
                  <div className="w-12 xl:w-20 h-2.5 xl:h-3.5 rounded-full bg-emerald-100 shrink-0" />
                </div>
                <div className="mt-1 xl:mt-2">
                  <div className="h-6 xl:h-8 w-3/4 max-w-20 xl:max-w-32 bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                  <div className="h-2.5 xl:h-3.5 w-full max-w-24 xl:max-w-40 bg-slate-300 rounded-md" />
                </div>
              </div>

              {/* Card 2: Low Stock Warning */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col gap-3 xl:gap-5">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-emerald-100 shrink-0" />
                  <div className="w-14 xl:w-24 h-2.5 xl:h-3.5 rounded-full bg-emerald-100 shrink-0" />
                </div>
                <div className="mt-1 xl:mt-2">
                  <div className="h-6 xl:h-8 w-[85%] max-w-24 xl:max-w-36 bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                  <div className="h-2.5 xl:h-3.5 w-[70%] max-w-20 xl:max-w-32 bg-slate-300 rounded-md" />
                </div>
              </div>

              {/* Card 3: Out of Stock (Hidden on mobile) */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm hidden md:flex flex-col gap-3 xl:gap-5">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-amber-50 shrink-0" />
                  <div className="w-12 xl:w-20 h-2.5 xl:h-3.5 rounded-full bg-slate-100 shrink-0" />
                </div>
                <div className="mt-1 xl:mt-2">
                  <div className="h-6 xl:h-8 w-1/2 max-w-16 xl:max-w-24 bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                  <div className="h-2.5 xl:h-3.5 w-[80%] max-w-20 xl:max-w-32 bg-slate-300 rounded-md" />
                </div>
              </div>

              {/* Card 4: Recent Movements (Hidden on tablet, shown on mobile/desktop) */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col gap-3 xl:gap-5 md:hidden xl:flex">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 xl:w-12 xl:h-12 rounded-md bg-indigo-50 shrink-0" />
                  <div className="w-12 xl:w-20 h-2.5 xl:h-3.5 rounded-full bg-slate-100 shrink-0" />
                </div>
                <div className="mt-1 xl:mt-2">
                  <div className="h-6 xl:h-8 w-[60%] max-w-20 xl:max-w-28 bg-slate-400 rounded-md mb-1.5 xl:mb-2.5" />
                  <div className="h-2.5 xl:h-3.5 w-full max-w-24 xl:max-w-36 bg-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            {/* 
              Second Row: Chart and List 
              A 2-column grid that stacks on mobile.
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6 shrink-0 flex-1 min-h-40">
              {/* Left Column: Mock Area Chart */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col h-full">
                <div className="h-3 xl:h-4 w-1/2 max-w-48 xl:max-w-64 bg-slate-400 rounded-md mb-auto shrink-0" />
                <div className="flex-1 w-full mt-4 xl:mt-6 relative flex items-end">
                  <div
                    className="w-full h-[85%] bg-linear-to-t from-emerald-50 to-emerald-200 border-t-2 xl:border-t-4 border-emerald-400 rounded-t-sm"
                    style={{
                      clipPath:
                        "polygon(0 70%, 15% 70%, 30% 60%, 45% 45%, 60% 35%, 75% 40%, 85% 15%, 100% 70%, 100% 100%, 0 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Mock List of Items */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 xl:p-6 shadow-sm flex flex-col h-full min-h-44">
                <div className="h-3 xl:h-4 w-[60%] max-w-56 xl:max-w-80 bg-slate-400 rounded-md mb-4 xl:mb-8 shrink-0" />
                <div className="flex flex-col gap-4 xl:gap-6 flex-1 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 xl:gap-3 w-[70%]">
                        {/* Status Indicator Dot */}
                        <div
                          className={`w-2 h-2 xl:w-3 xl:h-3 rounded-full shrink-0 ${i <= 2 ? "bg-amber-400" : "bg-emerald-400"}`}
                        />
                        {/* Item Name */}
                        <div className="h-2 xl:h-3 w-full bg-slate-300 rounded-full" />
                      </div>
                      {/* Item Value */}
                      <div className="h-2 xl:h-3 w-[20%] max-w-12 xl:max-w-16 bg-slate-400 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

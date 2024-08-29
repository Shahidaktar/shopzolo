import AdminLayout from "../../components/shared/Layout/AdminLayout";
import { BiMaleFemale } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { Skeleton } from "../../components/Loader";
import { getLastMonths } from "../../utils/features";
import { Navigate } from "react-router-dom";
import WidgetCard from "../../components/shared/WidgetCard";
import CategoryItem from "../../components/shared/CategoryItem";
import { BarChart, DoughnutChart } from "../../components/shared/Chart";

const { last6Months: months } = getLastMonths();

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError } = useStatsQuery(user?._id!);
  const stats = data?.data!;
  if (isError) return <Navigate to="/" />;

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <WidgetCard
                heading={"Revenue"}
                value={stats.count.revenue}
                color={"rgb(59 180 246)"}
                percent={stats.changePercent.revenue}
                amount={true}
              />

              <WidgetCard
                heading={"User"}
                value={stats.count.user}
                color={"rgb(20 184 166)"}
                percent={stats.changePercent.user}
              />
              <WidgetCard
                heading={"Order"}
                value={stats.count.order}
                color={"rgb(202 138 4)"}
                percent={stats.changePercent.order}
              />

              <WidgetCard
                heading={"Product"}
                value={stats.count.product}
                color={"rgb(126 34 206)"}
                percent={stats.changePercent.product}
              />
            </div>
            <section className=" lg:flex flex-none">
              <div className=" bg-white rounded-[10px] w-full p-2">
                <h2 className="text-center mt-2 mb-3 font-serif font-semibold">
                  Revenue & Transaction
                </h2>
                <BarChart
                  labels={months}
                  data_1={stats.chart.revenue}
                  data_2={stats.chart.order}
                  title_1="Revenue"
                  title_2="Transaction"
                  bgColor_1="rgb(0, 115, 255)"
                  bgColor_2="rgba(53, 162, 235, 0.8)"
                />
              </div>

              <div className=" w-full max-w-[16rem]  flex-col justify-center pb-8 ml-[12%]">
                <h2 className="text-center mt-2 font-serif font-semibold">
                  Inventory
                </h2>

                <div className="  pl-2 scrollbar-hide">
                  {stats.categoryCount.map((i) => {
                    const [heading, value] = Object.entries(i)[0];
                    return (
                      <CategoryItem
                        key={heading}
                        value={value}
                        heading={heading}
                        color={`hsl(${value * 4}, ${value}%, 50%)`}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="lg:flex  gap-8 pt-4 px-2 h-full lg:h-[30rem] lg:justify-between">
              <div className=" bg-white rounded-[10px] w-full max-w-[18rem] p-1 relative ml-[12%] ">
                <h2 className="text-center font-serif font-semibold mb-4">
                  Gender Ratio
                </h2>
                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[stats.userRatio.female, stats.userRatio.male]}
                  backgroundColor={[
                    "hsl(340, 82%, 56%)",
                    "rgba(53, 162, 235, 0.8)",
                  ]}
                  cutout={90}
                />
                <p className="text-blue-600 text-4xl absolute top-[40%] right-[45%] lg:top-[28%]">
                  <BiMaleFemale />
                </p>
              </div>
            

              <div className=" w-full  space-y-3 overflow-x-scroll scrollbar-hide ">
                <h1 className=" p-1 w-full font-serif font-semibold overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 flex justify-center  ">
                  Transactions
                </h1>
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                        ID
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        Qty
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        Discount
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {stats?.latestTransactions.map((record) => (
                      <tr key={record._id}>
                        <td className="px-4 py-1 text-xs">{record._id}</td>
                        <td className="px-4 py-1">{record.quantity}</td>
                        <td className="px-4 py-1">{record.discount}</td>
                        <td className="px-4 py-1">₹{record.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;


import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'Page D',
        uv: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Page E',
        uv: 1520,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Page F',
        uv: 1400,
        pv: 680,
        amt: 1700,
    },
]

const SalesOverViewChart = () => {
    return (
        <>
            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 px-6'>
                <div className="w-full h-[300px] bg-[#111] rounded-xl p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-white mb-4">Sales Overview</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 0,
                            }}
                        >
                            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#333' }} />
                            <Legend wrapperStyle={{ color: '#ccc' }} />
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#00C49F" />
                            <Line type="monotone" dataKey="uv" stroke="#FFBB28" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full h-[300px] bg-[#111] rounded-xl p-4 shadow-md">
                    <h2 className="text-lg font-semibold text-white mb-4">Sales Overview</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 0,
                            }}
                        >
                            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#333' }} />
                            <Legend wrapperStyle={{ color: '#ccc' }} />
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#00C49F" />
                            <Line type="monotone" dataKey="uv" stroke="#FFBB28" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>

    )
}

export default SalesOverViewChart

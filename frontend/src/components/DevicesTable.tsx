import type { Device, DeviceStatus } from "../types/device"
import { formatDatabaseString } from "../utils/formatDatabaseString"
import reactLogo from '../assets/react.svg'

interface DevicesTableProps {
    devices: Device[]
    onAddClick: () => void
}

const statusStyles: Record<DeviceStatus, string> = {
    acquired: 'bg-slate-50 text-slate-700 ring-slate-600/20',
    broken: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    in_repair: 'bg-amber-50 text-amber-800 ring-amber-600/20',
    refurbished: 'bg-purple-50 text-purple-700 ring-purple-600/20',
    listed: 'bg-sky-50 text-sky-700 ring-sky-600/20',
    sold: 'bg-green-50 text-green-700 ring-green-600/20',
}

export default function DevicesTable(props: DevicesTableProps) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all devices.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={props.onAddClick}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add device
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Category
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Purchase Price
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Sold Price
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {props.devices.map((device) => (
                                    <tr key={device.id}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img className="h-11 w-11" src={reactLogo} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{device.name}</div>
                                                    {device.serial_number && <div className="mt-1 text-gray-500">Serial: {device.serial_number}</div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">{device.category}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[device.status] || 'bg-gray-50 text-gray-600 ring-gray-500/10'
                                                    }`}
                                            >
                                                {formatDatabaseString(device.status.toUpperCase())}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">${device.purchase_price}</td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{device.sold_price ? `$${device.sold_price}` : '-'}</td>
                                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit<span className="sr-only">, {device.name}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
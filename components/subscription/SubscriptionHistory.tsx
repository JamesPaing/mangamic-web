import React from 'react';

const SubscriptionHistory = (props: any) => {
    const { subscriptions } = props;

    return (
        <div className="flex flex-col animate__animated animate__slideInRight">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Started Date
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Ended Date
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Plan
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.length > 0
                                    ? subscriptions.map(
                                          (sub: any, i: number) => (
                                              <tr
                                                  key={i}
                                                  className="border-b dark:border-neutral-500"
                                              >
                                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                      {i + 1}
                                                  </td>
                                                  <td className="whitespace-nowrap px-6 py-4">
                                                      {new Date(
                                                          sub.startedDate
                                                      ).toLocaleDateString(
                                                          'mm'
                                                      )}
                                                  </td>
                                                  <td className="whitespace-nowrap px-6 py-4">
                                                      {new Date(
                                                          sub.endedDate
                                                      ).toLocaleDateString(
                                                          'mm'
                                                      )}
                                                  </td>
                                                  <td className="whitespace-nowrap px-6 py-4">
                                                      {
                                                          sub.subscriptionRate
                                                              .name
                                                      }
                                                  </td>
                                                  <td className="whitespace-nowrap px-6 py-4">
                                                      <span
                                                          className={`${
                                                              sub.status !=
                                                              'approved'
                                                                  ? 'text-amber-500'
                                                                  : 'text-green-500'
                                                          } capitalize`}
                                                      >
                                                          {sub.status}
                                                      </span>
                                                  </td>
                                              </tr>
                                          )
                                      )
                                    : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionHistory;

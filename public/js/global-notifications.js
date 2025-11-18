// /js/global-notifications.js
export function setupJobStatusNotifications(supabase, user, onChange) {
    const channel = supabase
      .channel("jobs-realtime-global-" + user.id)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs" },
        async (payload) => {
          const oldRow = payload.old;
          const newRow = payload.new;

          const isUserJob =
            (newRow && (newRow.client_id === user.id || newRow.worker_id === user.id)) ||
            (oldRow && (oldRow.client_id === user.id || oldRow.worker_id === user.id));

          if (!isUserJob) return;

          if (oldRow && newRow && oldRow.status !== newRow.status) {
              onChange(oldRow, newRow);
          }
        }
      )
      .subscribe();

    return channel;
}

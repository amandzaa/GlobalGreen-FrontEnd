import React from "react";

export const VoucherTips: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--color-paleGreen)]">
      <h2 className="text-xl font-semibold text-[var(--color-darkGreen)] mb-4">
        Voucher Creation Tips
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paleGreen)] p-4 rounded-lg">
          <h3 className="font-medium text-[var(--color-darkGreen)] mb-2">
            Effective Codes
          </h3>
          <p className="text-sm text-[var(--color-darkGreen)]/80">
            Create memorable, easy-to-type codes. Use themed codes for seasonal promotions (e.g., SUMMER25, HARVEST20).
          </p>
        </div>

        <div className="bg-[var(--color-paleGreen)] p-4 rounded-lg">
          <h3 className="font-medium text-[var(--color-darkGreen)] mb-2">
            Discount Strategy
          </h3>
          <p className="text-sm text-[var(--color-darkGreen)]/80">
            Consider using percentage discounts for higher-priced items and fixed discounts for lower-priced products to maximize perceived value.
          </p>
        </div>

        <div className="bg-[var(--color-paleGreen)] p-4 rounded-lg">
          <h3 className="font-medium text-[var(--color-darkGreen)] mb-2">
            Time Limitations
          </h3>
          <p className="text-sm text-[var(--color-darkGreen)]/80">
            Setting a clear time limit creates urgency. Weekend vouchers and limited-time offers typically see 50% higher usage rates.
          </p>
        </div>
      </div>
    </div>
  );
};
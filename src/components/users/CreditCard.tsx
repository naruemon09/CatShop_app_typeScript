import React, { useState } from "react";
import { Icon } from "@iconify/react";
import type { IPayment } from "../../Interface/IPayment";

const CreditCard: React.FC  = ({ setValid }) => {
  const [payment, setPayment] = useState<IPayment>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const [cardType, setCardType] = useState("");

  const detectCardType = (number:string) => {
    const cleanNumber = number.replace(/\s/g, "");

    const cardPatterns = {
      visa: /^4/,
      mastercard: /^5[1-5]|^2[2-7]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
      jcb: /^35/,
      unionpay: /^62/,
    };

    for (const [type, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(cleanNumber)) {
        return type;
      }
    }
    return "";
  };

  const formatCardNumber = (value:string) => {
    const cleanValue = value.replace(/\s/g, "");
    const groups = cleanValue.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleanValue;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      const formattedValue = formatCardNumber(value);
      setPayment({ ...payment, number: formattedValue });
      setCardType(detectCardType(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setPayment({ ...payment, expiry: value });
  };

  const getCardIcon = (type: string) => {
    const icons: Record<string, string> = {
      visa: "logos:visa",
      mastercard: "logos:mastercard",
      amex: "logos:amex",
      discover: "logos:discover",
      jcb: "logos:jcb",
      unionpay: "logos:unionpay",
    };

    const iconName = icons[type] || "mdi:credit-card-outline";
    return <Icon icon={iconName} width="35" height="35" />;
  };

  const getCardBrandName = (type: string) => {
    const names: Record<string, string> = {
      visa: "Visa",
      mastercard: "Mastercard",
      amex: "American Express",
      discover: "Discover",
      jcb: "JCB",
      unionpay: "UnionPay",
    };
    setValid(type)
    return names[type] || null;
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label">หมายเลขบัตร</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control pe-5"
              placeholder="1234 5678 9012 3456"
              value={payment.number}
              onChange={(e) => handleCardNumberChange(e)}
              maxLength={19}
              required
            />
            {cardType && (
              <div
                className="position-absolute"
                style={{
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                {getCardIcon(cardType)}
              </div>
            )}
          </div>
          {cardType && (
            <div className="form-text">
              ✅ บัตรนี้ใช้ได้ {getCardBrandName(cardType)}
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label">ชื่อผู้ถือบัตร</label>
          <input
            type="text"
            className="form-control"
            placeholder="JOHN DOE"
            value={payment.name}
            onChange={(e) =>
              setPayment({ ...payment, name: e.target.value.toUpperCase() })
            }
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 ">
          <label className="form-label">วันหมดอายุ</label>
          <input
            type="text"
            className="form-control"
            placeholder="MM/YY"
            value={payment.expiry}
            onChange={(e) => handleExpiryChange(e)}
            maxLength={5}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">CVV / CVC</label>
          <input
            type="text"
            className="form-control"
            placeholder="123"
            value={payment.cvc}
            onChange={(e) =>
              setPayment({
                ...payment,
                cvc: e.target.value.replace(/\D/g, "").substring(0, 4),
              })
            }
            maxLength={4}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCard;

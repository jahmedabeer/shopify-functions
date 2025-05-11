import {
  reactExtension,
  Banner,
  BlockStack,
  useDiscountCodes,
  useApplyAttributeChange
} from '@shopify/ui-extensions-react/checkout';
import { useEffect } from 'react';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const [discountCode] = useDiscountCodes();
  const applyAttributeChange = useApplyAttributeChange();
  
  useEffect(() =>{
    applyAttributeChange({
      type: 'updateAttribute',
      key: 'discount_present',
      value: discountCode ? 'true' : 'false'
    });
  }, [discountCode, applyAttributeChange])

  return (
    <BlockStack>
      <Banner>
        { discountCode ? `Discount code: ${discountCode.code}` : 'No discount code applied'}
      </Banner>
    </BlockStack>
  );
}
import { HttpResponse, http } from "msw";
import { DeliverOrderBody } from "../deliver-order";

export const deliverOrderMock = http.patch<DeliverOrderBody, never, never>('/orders/:orderId/deliver', 
    async({ params }) => {
        
        if(params.orderId === 'error-order-id') {
            return new HttpResponse(null, { status: 400 })
        }

        return new HttpResponse(null, { status: 204 })
    }
)
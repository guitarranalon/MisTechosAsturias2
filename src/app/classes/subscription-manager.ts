import { Subscription } from "rxjs";

export class SubscriptionManager {
    subscriptions: Subscription[];

    constructor () {
        this.subscriptions = new Array<Subscription>();
    }

    addSubscription(subs: Subscription) {
        this.subscriptions.push(subs);
    }

    removeAllSubscriptions() {
        for (let subs of this.subscriptions) {
            subs.unsubscribe();
        }
    }
}

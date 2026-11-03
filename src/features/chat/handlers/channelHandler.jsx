import { validate } from "../utils/channelValidator";

export default {

    createChannel: {
        validate: (data, channelsInStore) => validate(channelsInStore, data),
    }
}
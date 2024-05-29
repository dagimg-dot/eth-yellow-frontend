export default {
    install(app, options) {

        app.config.globalProperties.$app = app

        Object.defineProperty(app.config.globalProperties, '$modal', {
            get: function () {

                const root = this

                return {
                    show(component, props) {
                        root.__modalsContainer.add(component, props)
                    }
                }

            }
        })
    }
}
@file:OptIn(ExperimentalJsExport::class)

import kotlinx.browser.document
import kotlinx.browser.window
import kotlinx.dom.appendElement


fun main() {
    println("Hello, world!")
    document.body?.appendElement("div") {
        this.appendElement("h1") {
            this.textContent = "I am in the h1"
        }
        window.fetch("https://usu.edu")
            .then {
                this.appendElement("div") {
                    textContent = it.body.toString()
                }
            }
    }
}

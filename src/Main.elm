module Main exposing (main)

import Browser
import Browser.Navigation
import Html
import Html.Attributes as Attributes
import Html.Events as Events
import Icon
import Json.Decode
import Model
import Port
import Preferences
import Preferences.Msg
import Ui
import Url exposing (Url)


type alias Flags =
    Json.Decode.Value


type Msg
    = Noop
    | Modal Bool
    | Preference Preferences.Msg.Msg
    | Port Port.IncomingMsg


subscriptions : Model.Model -> Sub Msg
subscriptions _ =
    Sub.map Port Port.subscriptions


main : Program Flags Model.Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = onUrlRequest
        , onUrlChange = onUrlChange
        }


init : Flags -> Url -> Browser.Navigation.Key -> ( Model.Model, Cmd Msg )
init flags url key =
    let
        ( preferences, commands ) =
            Preferences.init flags
    in
    ( Model.Model preferences False, Cmd.map Preference commands )


view : Model.Model -> Browser.Document Msg
view model =
    { title = "Austin Bookhart"
    , body =
        [ Html.header
            [ Attributes.class
                (if model.modalOpen then
                    "modalOpen"

                 else
                    ""
                )
            ]
            [ Ui.nav []
                [ Ui.a [ Attributes.href "#" ] [ Html.text "About" ]
                , Ui.a [ Attributes.href "#" ] [ Html.text "Blog" ]
                , Ui.button [ Events.onClick (Modal True), Attributes.attribute "aria-label" "Accessibility" ] [ Icon.accessibility ]
                ]
            ]
        , Html.main_
            [ Attributes.class
                (if model.modalOpen then
                    "modalOpen"

                 else
                    ""
                )
            ]
            [ Html.h1 []
                [ Ui.headerAnchor
                    [ Attributes.href "#about"
                    , Attributes.id "about"
                    ]
                    [ Html.text "#" ]
                , Html.text "About"
                ]
            , Html.p []
                [ Html.text "Hello, my name is Austin Bookhart. I'm a Software Engineer that has worked primarily as a Full-Stack Developer with an emphasis towards Frontend development. My goal is to create UIs that facilitate concise user experiences and are accessible to a wide variety of audiences." ]
            ]
        , Html.div
            [ Attributes.id "backdrop"
            , Events.onClick (Modal False)
            , Attributes.class
                (if model.modalOpen then
                    "visible"

                 else
                    ""
                )
            ]
            []
        , Html.node "dialog"
            [ Attributes.attribute "open"
                (if model.modalOpen then
                    "true"

                 else
                    "false"
                )
            ]
            [ Html.map Preference (Preferences.view model.preferences) ]
        ]
    }


update : Msg -> Model.Model -> ( Model.Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Modal open ->
            ( { model | modalOpen = open }, Cmd.none )

        Preference preferenceMsg ->
            let
                ( preferences, commands ) =
                    Preferences.update preferenceMsg model.preferences
            in
            ( { model | preferences = preferences }, Cmd.map Preference commands )

        Port (Port.IncomingMsg message) ->
            let
                preferences =
                    model.preferences
            in
            if message.key == "UpdateSystemColorScheme" then
                let
                    ( updatedPreferences, preferenceCommands ) =
                        Preferences.update
                            (Preferences.Msg.ColorScheme
                                (Preferences.Msg.SystemValue
                                    (Result.withDefault preferences.colorScheme.systemValue
                                        (Json.Decode.decodeValue Json.Decode.string message.value)
                                    )
                                )
                                True
                            )
                            preferences
                in
                ( { model | preferences = updatedPreferences }, Cmd.map Preference preferenceCommands )

            else
                ( model, Cmd.none )


onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest request =
    Noop


onUrlChange : Url -> Msg
onUrlChange url =
    Noop

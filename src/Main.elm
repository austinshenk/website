module Main exposing (main)

import Am
import Browser
import Browser.Navigation
import Html
import Html.Attributes as Attributes
import Html.Events as Events
import Icon
import Json.Decode
import Model
import Msg exposing (Msg(..))
import Port
import Preferences
import Preferences.Msg exposing (Msg(..))
import Ui
import Url exposing (Url)


type alias Flags =
    Json.Decode.Value


subscriptions : Model.Model -> Sub Msg.Msg
subscriptions _ =
    Sub.map Port Port.subscriptions


main : Program Flags Model.Model Msg.Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = onUrlRequest
        , onUrlChange = onUrlChange
        }


init : Flags -> Url -> Browser.Navigation.Key -> ( Model.Model, Cmd Msg.Msg )
init flags url key =
    let
        ( preferences, commands ) =
            Preferences.init flags
    in
    ( Model.Model preferences, Cmd.map Preference commands )


view : Model.Model -> Browser.Document Msg.Msg
view model =
    { title = "Austin Bookhart"
    , body =
        [ Html.section
            [ Attributes.class
                (if model.preferences.open then
                    "modalOpen"

                 else
                    ""
                )
            ]
            [ Html.header []
                [ Ui.nav [ Am.flexbox "", Am.flexboxJustifyContent "space-evenly" ]
                    [ Ui.a [ Attributes.href "#" ] [ Html.text "About" ]
                    , Ui.a [ Attributes.href "#" ] [ Html.text "Blog" ]
                    , Ui.button [ Events.onClick (Preference (Open True)), Attributes.attribute "aria-label" "Accessibility" ] [ Icon.accessibility ]
                    ]
                ]
            , Html.main_ []
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
                , Events.onClick (Preference (Open False))
                , Attributes.class
                    (if model.preferences.open then
                        "visible"

                     else
                        ""
                    )
                ]
                []
            , Html.node "dialog"
                [ Attributes.attribute "open"
                    (if model.preferences.open then
                        "true"

                     else
                        "false"
                    )
                ]
                [ Html.map Preference (Preferences.view model.preferences) ]
            ]
        ]
    }


update : Msg.Msg -> Model.Model -> ( Model.Model, Cmd Msg.Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

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


onUrlRequest : Browser.UrlRequest -> Msg.Msg
onUrlRequest _ =
    Noop


onUrlChange : Url -> Msg.Msg
onUrlChange _ =
    Noop

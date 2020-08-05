module Main exposing (main)

import Am
import Browser
import Browser.Dom as Dom
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
import Task
import Tooltip exposing (tooltip)
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
        , onUrlRequest = Msg.UrlRequest
        , onUrlChange = Msg.UrlChange
        }


init : Flags -> Url -> Browser.Navigation.Key -> ( Model.Model, Cmd Msg.Msg )
init flags url key =
    let
        ( preferences, commands ) =
            Preferences.init flags
    in
    ( Model.Model key preferences, Cmd.map Preference commands )


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
            [ Html.section [ Am.containerFloating, Attributes.id "skip-to-links" ]
                [ Ui.a [ Attributes.href "#main" ] [ Html.text "Skip to Content" ] ]
            , Html.header []
                [ Ui.nav [ Am.flexbox "", Am.flexboxJustifyContent "space-evenly" ]
                    [ Ui.a [ Attributes.href "#" ] [ Html.text "About" ]
                    , Ui.a [ Attributes.href "#" ] [ Html.text "Blog" ]
                    , tooltip "btn-accessibility"
                        (Html.text "Accessibility")
                        Ui.button
                        [ Events.onClick (Preference (Open True))
                        , Attributes.attribute "aria-label" "Accessibility"
                        , Attributes.id "btn-preferences"
                        ]
                        [ Icon.accessibility ]
                    ]
                ]
            , Html.main_ [ Attributes.id "main", Attributes.tabindex 0 ]
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
                , Attributes.attribute "open"
                    (if model.preferences.open then
                        "true"

                     else
                        "false"
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
        Msg.Noop ->
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

        UrlRequest urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model
                    , Browser.Navigation.pushUrl model.navigationKey (Url.toString url)
                    )

                Browser.External url ->
                    ( model
                    , Browser.Navigation.load url
                    )

        UrlChange url ->
            let
                fragment =
                    Maybe.withDefault "" url.fragment

                command =
                    if not (fragment == "") then
                        Task.attempt (\_ -> Msg.Noop) (Dom.focus fragment)

                    else
                        Cmd.none
            in
            ( model, command )

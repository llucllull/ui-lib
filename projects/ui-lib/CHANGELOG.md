# Changelog

All notable changes to this project will be documented in this file.

## [0.7.0] - 2025-08-23
### Added
- Add links-footer component
- Add stories for links-footer
- Add mapper for links-footer

## [0.6.0] - 2025-08-23
### Added
- Add deploy for Storybook

## [0.5.2] - 2025-08-14
### Added
- Add optionallity to icon
- Change font-size for btn-link
- Add stories for category-progress and section-intro
- Update story for header-clear

## [0.5.1] - 2025-08-14
### Added
- Update font-size on hero-section component
- Update modal item styles and introduce new font variables
- Add social items support to header and nav modal components

## [0.5.0] - 2025-08-14
### Added
- Add variables for theme color handle
- Theme toggle functionality in header components
- Add theme service for managing light and dark themes
- Change logo depending on the theme

## [0.4.5] - 2025-08-14
### Added
- Fix styles hero-section
- Update color variables for header and buttons
- Add home link functionality to header components
- Update styles for modals

## [0.4.4] - 2025-08-13
### Added
- Update imports for ui-lib
- Add animation highlight to hero-section component

## [0.4.3] - 2025-08-13
### Added
- Fix style from close-btn in modals
- Add pretitle to hero-section component
- Update styles from hero-section

## [0.4.2] - 2025-08-11
### Added
- Update styles for lang and nav modals
- Refactor CSS variables for consistency across components
- Add button icon to hero-section component
- Update btn-link common styles

## [0.4.1] - 2025-08-11
### Added
- Update mapImage function
- Add logo to headers

## [0.4.0] - 2025-07-31
### Added
- Add new component CategoryProgress
- Add mapper for CategoryProgress

## [0.3.0] - 2025-07-29
### Added
- Add new component SectionIntro
- Add mapper for SectionIntro
- Create typography styles file

## [0.2.3] - 2025-07-29
### Added
- Enhance deploy script with CSS compilation and validation
- Change styles for HeroSection

## [0.2.2] - 2025-07-28
### Added
- Update package.json and workflows for style building and publishing

## [0.2.1] - 2025-07-28
### Added
- Add HeaderMobile component
- Create screenSizer service
- Update mixins functions
- Restructure SCSS files and introduce new styles
- Update Storybook configuration

## [0.2.0] - 2025-07-28
### Added
- Integration of Storybook with configuration and documentation
- Add HeroSection component stories for Storybook
- Add global, common, variables, breakpoints and mixins styles
- Create styles for HeroSection component
- Create styles for HeaderClear component

## [0.1.6] - 2025-07-23
### Added
- Add nav-modal functionalities

## [0.1.5] - 2025-07-22
### Added
- Add new imports from new interfaces

## [0.1.4] - 2025-07-22
### Added
- Update 'lang-modal' component and mapper

## [0.1.3] - 2025-07-20
### Added
- Create 'header-clear', 'lang-modal' and 'nav-modal' components
- Update PageComponent interface
- Create NavItems interface
- Create 'header-clear', 'lang-modal' and 'nav-modal' mappers

## [0.1.2] - 2025-07-12
### Added
- Rename 'top-slider' to 'hero-section'
- Add utils functions and interfaces for buttons and images
- Edit Prettier formatter
- Create linkType directive + enum
- Code and map hero-section

## [0.1.1] - 2025-07-10
### Added
- Fix deploy script command

## [0.1.0] - 2025-07-10
### Added
- MapperService`: logic to dynamically map components by name and props.
- Individual mapper structure (`component-mappers/`) to easily scale components.
- BodyComponent<T>` and other interfaces centralised in the library.
- SSR compatibility preparation (use of `PLATFORM_ID`).
- Base configuration to consume interfaces and services from external apps (e.g. `portfolio`).

## [0.0.2] - 2025-07-01
### Added
- First basic component generated in the `ui-lib` library.

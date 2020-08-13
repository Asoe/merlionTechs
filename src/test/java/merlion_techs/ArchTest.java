package merlion_techs;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("merlion_techs");

        noClasses()
            .that()
                .resideInAnyPackage("merlion_techs.service..")
            .or()
                .resideInAnyPackage("merlion_techs.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..merlion_techs.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
